package inventory.app.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import inventory.app.backend.entities.InventoryEntity;
import inventory.app.backend.exceptions.NotFoundEntityException;
import inventory.app.backend.exceptions.ValidationException;
import inventory.app.backend.mappers.InventoryMapper;
import inventory.app.api.model.Inventory;
import inventory.app.api.model.ResponseId;
import inventory.app.backend.repositories.InventoryRepository;
import inventory.app.backend.validation.ValidationResult;
import inventory.app.backend.validation.ValidationResult.Context;
import inventory.app.backend.validation.Validators;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    private final InventoryMapper mapper;

    private final Validators validators;

    @Override
    public List<Inventory> findAll() {
        List<Inventory> inventoryEntities = new ArrayList<>();
        inventoryRepository.findAll().forEach(inventoryEntity ->
                inventoryEntities.add(mapper.toDto(inventoryEntity))
        );
        return inventoryEntities;
    }

    @Override
    public ResponseId save(Inventory inventory) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<Context> contextSupplier = Context.contextSupplier(inventory);
        InventoryEntity inventoryEntity = mapper.toEntity(inventory);
        validators.validate(validationResult,
                validators.validateTextDataLength(inventoryEntity),
                validators.validateValuesInNotNullColumns(inventoryEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation inventoryEntity error ", validationResult);
        }

        ResponseId responseId = new ResponseId();
        responseId.setId(inventoryRepository.save(inventoryEntity).getId());
        return responseId;
    }

    @Override
    public void update(Long inventoryId, Inventory inventory) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<Context> contextSupplier = Context.contextSupplier(inventory);

        InventoryEntity inventoryEntity = inventoryRepository.findById(inventoryId).orElseThrow(
                () -> new NotFoundEntityException(inventory.getClass(), inventoryId));

        mapper.updateInventoryEntityWithInventory(inventoryEntity, inventory);

        validators.validate(validationResult,
                validators.validateTextDataLength(inventoryEntity),
                validators.validateValuesInNotNullColumns(inventoryEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation inventoryEntity error ", validationResult);
        }
        inventoryRepository.save(inventoryEntity);
    }

    @Override
    public void delete(Long inventoryId) {
        InventoryEntity inventoryEntity = inventoryRepository.findById(inventoryId).orElseThrow(
                () -> new NotFoundEntityException(Inventory.class, inventoryId));
        inventoryRepository.delete(inventoryEntity);
    }

    @Override
    public Inventory get(Long inventoryId) {
        InventoryEntity inventoryEntity = inventoryRepository.findById(inventoryId).orElseThrow(
                () -> new NotFoundEntityException(Inventory.class, inventoryId));
        return mapper.toDto(inventoryEntity);
    }
}
