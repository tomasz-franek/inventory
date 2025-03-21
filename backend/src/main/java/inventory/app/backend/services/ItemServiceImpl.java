package inventory.app.backend.services;

import inventory.app.api.model.Inventory;
import inventory.app.api.model.Item;
import inventory.app.api.model.ItemConsume;
import inventory.app.api.model.ResponseId;
import inventory.app.api.model.Storage;
import inventory.app.backend.entities.InventoryEntity;
import inventory.app.backend.entities.ItemEntity;
import inventory.app.backend.entities.StorageEntity;
import inventory.app.backend.exceptions.NotFoundEntityException;
import inventory.app.backend.exceptions.ValidationException;
import inventory.app.backend.mappers.ItemMapper;
import inventory.app.backend.repositories.InventoryRepository;
import inventory.app.backend.repositories.ItemRepository;
import inventory.app.backend.repositories.StorageRepository;
import inventory.app.backend.validation.ValidationResult;
import inventory.app.backend.validation.Validators;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    private final InventoryRepository inventoryRepository;

    private final StorageRepository storageRepository;

    private final ItemMapper mapper;

    private final Validators validators;

    @Override
    @Transactional(readOnly = true)
    public List<Item> findAll() {
        List<Item> items = new ArrayList<>();
        itemRepository.findAll().forEach(itemEntity ->
                items.add(mapper.toDto(itemEntity))
        );
        return items;
    }

    @Override
    @Transactional(readOnly = true)
    public Item getItem(Long idItem) {
        ItemEntity itemEntity = itemRepository.findById(idItem).orElseThrow(
                () -> new NotFoundEntityException(Item.class, idItem));
        return mapper.toDto(itemEntity);
    }

    @Override
    public ResponseId saveItem(Item item) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(item);

        StorageEntity storageEntity = storageRepository.findById(item.getIdStorage()).orElseThrow(
                () -> new NotFoundEntityException(Storage.class, item.getIdStorage()));

        ItemEntity itemEntity = mapper.toEntity(item);
        itemEntity.setStorage(storageEntity);

        if (item.getIdInventory() != null) {
            InventoryEntity inventoryEntity = inventoryRepository.findById(item.getIdInventory()).orElseThrow(
                    () -> new NotFoundEntityException(Inventory.class, item.getIdInventory()));
            itemEntity.setInventory(inventoryEntity);

        }
        validators.validate(validationResult,
                validators.validateTextDataLength(itemEntity),
                validators.validateValuesInNotNullColumns(itemEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation itemEntity error ", validationResult);
        }

        ResponseId responseId = new ResponseId();
        responseId.setId(itemRepository.save(itemEntity).getId());
        return responseId;
    }

    @Override
    public void updateItem(Long idItem, Item item) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(item);

        ItemEntity itemEntity = itemRepository.findById(idItem).orElseThrow(
                () -> new NotFoundEntityException(item.getClass(), idItem));

        mapper.updateItemEntityWithItem(itemEntity, item);

        validators.validate(validationResult,
                validators.validateTextDataLength(itemEntity),
                validators.validateValuesInNotNullColumns(itemEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation itemEntity error ", validationResult);
        }
        itemRepository.save(itemEntity);
    }

    @Override
    public void updateItemByInventoryId(Long idItem, Long idInventory) {
        ItemEntity itemEntity = itemRepository.findById(idItem).orElseThrow(
                () -> new NotFoundEntityException(Item.class, idItem));
        InventoryEntity inventoryEntity = inventoryRepository.findById(idInventory).orElseThrow(
                () -> new NotFoundEntityException(Inventory.class, idInventory));

        itemEntity.setInventory(inventoryEntity);
        itemRepository.save(itemEntity);
    }

    @Override
    public void consumeItem(ItemConsume itemConsume) {
        ItemEntity itemEntity = itemRepository.findById(itemConsume.getIdItem()).orElseThrow(
                () -> new NotFoundEntityException(Item.class, itemConsume.getIdItem()));
        itemEntity.setUsed(itemConsume.getUsed());
        if (BigDecimal.valueOf(100).compareTo(itemConsume.getUsed()) < 1
                && itemConsume.getEndDate() == null) {
            itemEntity.setEndDate(LocalDate.now());
        } else {
            itemEntity.setEndDate(itemConsume.getEndDate());
        }
        itemRepository.save(itemEntity);
    }
}
