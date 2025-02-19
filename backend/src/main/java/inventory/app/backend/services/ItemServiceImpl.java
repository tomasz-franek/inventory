package inventory.app.backend.services;

import inventory.app.api.model.Item;
import inventory.app.api.model.ResponseId;
import inventory.app.backend.entities.ItemEntity;
import inventory.app.backend.exceptions.NotFoundEntityException;
import inventory.app.backend.exceptions.ValidationException;
import inventory.app.backend.mappers.ItemMapper;
import inventory.app.backend.repositories.ItemRepository;
import inventory.app.backend.validation.ValidationResult;
import inventory.app.backend.validation.Validators;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    private final ItemMapper mapper;

    private final Validators validators;

    @Override
    public List<Item> findAll() {
        List<Item> items = new ArrayList<>();
        itemRepository.findAll().forEach(itemEntity ->
                items.add(mapper.toDto(itemEntity))
        );
        return items;
    }

    @Override
    public Item getItem(Long itemId) {
        ItemEntity itemEntity = itemRepository.findById(itemId).orElseThrow(
                () -> new NotFoundEntityException(Item.class, itemId));
        return mapper.toDto(itemEntity);
    }

    @Override
    public ResponseId saveItem(Item item) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(item);

        ItemEntity itemEntity = mapper.toEntity(item);

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
    public void updateItem(Long itemId, Item item) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(item);

        ItemEntity itemEntity = itemRepository.findById(itemId).orElseThrow(
                () -> new NotFoundEntityException(item.getClass(), itemId));

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
}
