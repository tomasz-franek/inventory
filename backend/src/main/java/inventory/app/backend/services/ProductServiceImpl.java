package inventory.app.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import inventory.app.backend.entities.CategoryEntity;
import inventory.app.backend.entities.ProductEntity;
import inventory.app.backend.exceptions.NotFoundEntityException;
import inventory.app.backend.exceptions.ValidationException;
import inventory.app.backend.mappers.ProductMapper;
import inventory.app.api.model.Category;
import inventory.app.api.model.Product;
import inventory.app.api.model.ResponseId;
import inventory.app.backend.repositories.CategoryRepository;
import inventory.app.backend.repositories.ProductRepository;
import inventory.app.backend.validation.ValidationResult;
import inventory.app.backend.validation.Validators;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    private final ProductMapper mapper;

    private final Validators validators;

    @Override
    public List<Product> findAll() {
        List<Product> productEntities = new ArrayList<>();
        productRepository.findAll().forEach(productEntity ->
                productEntities.add(mapper.toDto(productEntity))
        );
        return productEntities;
    }

    @Override
    public Product get(Long productId) {
        ProductEntity productEntity = productRepository.findById(productId).orElseThrow(
                () -> new NotFoundEntityException(Product.class, productId));
        return mapper.toDto(productEntity);
    }

    @Override
    public ResponseId save(Product product) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(product);

        validators.validate(validationResult,
                validators.notNullValue(product.getIdCategory(), contextSupplier, "idCategory", "idCategory is null")
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation product error ", validationResult);
        }

        CategoryEntity categoryEntity = categoryRepository.findById(product.getIdCategory()).orElseThrow(
                () -> new NotFoundEntityException(Category.class, product.getIdCategory()));

        ProductEntity productEntity = mapper.toEntity(product);

        productEntity.setCategory(categoryEntity);
        validators.validate(validationResult,
                validators.validateTextDataLength(productEntity),
                validators.validateValuesInNotNullColumns(productEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation productEntity error ", validationResult);
        }

        ResponseId responseId = new ResponseId();
        responseId.setId(productRepository.save(productEntity).getId());
        return responseId;
    }

    @Override
    public void update(Long productId, Product product) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(product);

        ProductEntity productEntity = productRepository.findById(productId).orElseThrow(
                () -> new NotFoundEntityException(product.getClass(), productId));

        mapper.updateProductEntityWithProduct(productEntity, product);

        validators.validate(validationResult,
                validators.validateTextDataLength(productEntity),
                validators.validateValuesInNotNullColumns(productEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation productEntity error ", validationResult);
        }
        productRepository.save(productEntity);
    }

    @Override
    public void delete(Long productId) {
        ProductEntity productEntity = productRepository.findById(productId).orElseThrow(
                () -> new NotFoundEntityException(Product.class, productId));

        productRepository.delete(productEntity);
    }
}
