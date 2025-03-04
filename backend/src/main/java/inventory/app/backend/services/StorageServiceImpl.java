package inventory.app.backend.services;

import inventory.app.api.model.Product;
import inventory.app.api.model.ResponseId;
import inventory.app.api.model.Storage;
import inventory.app.api.model.Unit;
import inventory.app.backend.entities.ProductEntity;
import inventory.app.backend.entities.StorageEntity;
import inventory.app.backend.entities.UnitEntity;
import inventory.app.backend.exceptions.NotFoundEntityException;
import inventory.app.backend.exceptions.ValidationException;
import inventory.app.backend.mappers.StorageMapper;
import inventory.app.backend.repositories.ProductRepository;
import inventory.app.backend.repositories.StorageRepository;
import inventory.app.backend.repositories.UnitRepository;
import inventory.app.backend.validation.ValidationResult;
import inventory.app.backend.validation.Validators;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {

    private final StorageRepository storageRepository;
    private final ProductRepository productRepository;
    private final UnitRepository unitRepository;

    private final StorageMapper mapper;

    private final Validators validators;

    @Override
    public List<Storage> findAll() {
        List<Storage> storages = new ArrayList<>();
        storageRepository.findAll().forEach(storageEntity ->
                storages.add(mapper.toDto(storageEntity))
        );
        return storages;
    }

    @Override
    public Storage get(Long storageId) {
        StorageEntity storageEntity = storageRepository.findById(storageId).orElseThrow(
                () -> new NotFoundEntityException(Storage.class, storageId));
        return mapper.toDto(storageEntity);
    }

    @Override
    public void update(Long storageId, Storage storage) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier =
                ValidationResult.Context.contextSupplier(storage);

        StorageEntity storageEntity = storageRepository.findById(storageId).orElseThrow(
                () -> new NotFoundEntityException(storage.getClass(), storageId));

        mapper.updateStorageEntityWithStorage(storageEntity, storage);

        validators.validate(validationResult,
                validators.validateTextDataLength(storageEntity),
                validators.validateValuesInNotNullColumns(storageEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation storageEntity error ", validationResult);
        }
        storageRepository.save(storageEntity);
    }

    @Override
    public ResponseId save(Storage storage) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier =
                ValidationResult.Context.contextSupplier(storage);

        validators.validate(validationResult,
                validators.notNullValue(storage.getIdProduct(), contextSupplier, "idProduct", "idProduct is null")
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation storage error ", validationResult);
        }

        ProductEntity productEntity = productRepository.findById(storage.getIdProduct()).orElseThrow(
                () -> new NotFoundEntityException(Product.class, storage.getIdProduct()));

        StorageEntity storageEntity = mapper.toEntity(storage);
        
        if (storage.getIdUnit() != null) {
            UnitEntity unitEntity = unitRepository.findById(storage.getIdUnit()).orElseThrow(
                    () -> new NotFoundEntityException(Unit.class, storage.getIdUnit()));
            storageEntity.setUnit(unitEntity);
        }

        storageEntity.setProduct(productEntity);
        validators.validate(validationResult,
                validators.validateTextDataLength(storageEntity),
                validators.validateValuesInNotNullColumns(storageEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation storageEntity error ", validationResult);
        }

        ResponseId responseId = new ResponseId();
        responseId.setId(storageRepository.save(storageEntity).getId());
        return responseId;
    }

    @Override
    public void delete(Long storageId) {
        StorageEntity storageEntity = storageRepository.findById(storageId).orElseThrow(
                () -> new NotFoundEntityException(Storage.class, storageId));

        storageRepository.delete(storageEntity);
    }
}
