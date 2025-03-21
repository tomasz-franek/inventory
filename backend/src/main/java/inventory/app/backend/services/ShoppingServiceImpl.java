package inventory.app.backend.services;

import inventory.app.api.model.Product;
import inventory.app.api.model.ResponseId;
import inventory.app.api.model.Shopping;
import inventory.app.api.model.Unit;
import inventory.app.backend.entities.ProductEntity;
import inventory.app.backend.entities.ShoppingEntity;
import inventory.app.backend.entities.UnitEntity;
import inventory.app.backend.exceptions.NotFoundEntityException;
import inventory.app.backend.exceptions.ValidationException;
import inventory.app.backend.mappers.ShoppingMapper;
import inventory.app.backend.repositories.ProductRepository;
import inventory.app.backend.repositories.ShoppingRepository;
import inventory.app.backend.repositories.UnitRepository;
import inventory.app.backend.validation.ValidationResult;
import inventory.app.backend.validation.Validators;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class ShoppingServiceImpl implements ShoppingService {

    private final ShoppingRepository shoppingRepository;

    private final ProductRepository productRepository;

    private final UnitRepository unitRepository;

    private final ShoppingMapper mapper;

    private final Validators validators;

    @Override
    @Transactional(readOnly = true)
    public List<Shopping> findAll() {
        List<Shopping> shopping = new ArrayList<>();
        shoppingRepository.findAll().forEach(shoppingEntity ->
                shopping.add(mapper.toDto(shoppingEntity))
        );
        return shopping;
    }

    @Override
    public ResponseId save(Shopping shopping) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(shopping);

        validators.validate(validationResult,
                validators.notNullValue(shopping.getIdProduct(), contextSupplier, "idProduct", "idProduct is null")
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation shopping error ", validationResult);
        }

        ProductEntity productEntity = productRepository.findById(shopping.getIdProduct()).orElseThrow(
                () -> new NotFoundEntityException(Product.class, shopping.getIdProduct()));
        ShoppingEntity shoppingEntity = mapper.toEntity(shopping);


        shoppingEntity.setProduct(productEntity);
        if (shopping.getIdUnit() != null) {
            UnitEntity unitEntity = unitRepository.findById(shopping.getIdUnit()).orElseThrow(
                    () -> new NotFoundEntityException(Unit.class, shopping.getIdUnit()));
            shoppingEntity.setUnit(unitEntity);
        }

        validators.validate(validationResult,
                validators.validateTextDataLength(shoppingEntity),
                validators.validateValuesInNotNullColumns(shoppingEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation shoppingEntity error ", validationResult);
        }

        ResponseId responseId = new ResponseId();
        responseId.setId(shoppingRepository.save(shoppingEntity).getId());
        return responseId;
    }

    @Override
    @Transactional(readOnly = true)
    public Shopping get(Long shoppingId) {
        ShoppingEntity shoppingEntity = shoppingRepository.findById(shoppingId).orElseThrow(
                () -> new NotFoundEntityException(Shopping.class, shoppingId));
        return mapper.toDto(shoppingEntity);
    }

    @Override
    public void update(Long shoppingId, Shopping shopping) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(shopping);

        ShoppingEntity shoppingEntity = shoppingRepository.findById(shoppingId).orElseThrow(
                () -> new NotFoundEntityException(shopping.getClass(), shoppingId));

        mapper.updateShoppingEntityWithShopping(shoppingEntity, shopping);

        validators.validate(validationResult,
                validators.validateTextDataLength(shoppingEntity),
                validators.validateValuesInNotNullColumns(shoppingEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation shoppingEntity error ", validationResult);
        }
        shoppingRepository.save(shoppingEntity);
    }

    @Override
    public void delete(Long shoppingId) {
        ShoppingEntity shoppingEntity = shoppingRepository.findById(shoppingId).orElseThrow(
                () -> new NotFoundEntityException(Shopping.class, shoppingId));

        shoppingRepository.delete(shoppingEntity);
    }
}
