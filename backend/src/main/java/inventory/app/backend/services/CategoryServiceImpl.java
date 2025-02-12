package inventory.app.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import inventory.app.backend.entities.CategoryEntity;
import inventory.app.backend.exceptions.NotFoundEntityException;
import inventory.app.backend.exceptions.ValidationException;
import inventory.app.backend.mappers.CategoryMapper;
import inventory.app.api.model.Category;
import inventory.app.api.model.ResponseId;
import inventory.app.backend.repositories.CategoryRepository;
import inventory.app.backend.validation.ValidationResult;
import inventory.app.backend.validation.Validators;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final CategoryMapper mapper;

    private final Validators validators;

    @Override
    public List<Category> findAll() {
        List<Category> categoryEntities = new ArrayList<>();
        categoryRepository.findAll().forEach(categoryEntity ->
                categoryEntities.add(mapper.toDto(categoryEntity))
        );
        return categoryEntities;
    }

    @Override
    public ResponseId save(Category category) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(category);
        CategoryEntity categoryEntity = mapper.toEntity(category);
        validators.validate(validationResult,
                validators.validateTextDataLength(categoryEntity),
                validators.validateValuesInNotNullColumns(categoryEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation categoryEntity error ", validationResult);
        }

        ResponseId responseId = new ResponseId();
        responseId.setId(categoryRepository.save(categoryEntity).getId());
        return responseId;
    }

    @Override
    public void update(Long categoryId, Category category) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(category);

        CategoryEntity categoryEntity = categoryRepository.findById(categoryId).orElseThrow(
                () -> new NotFoundEntityException(category.getClass(), categoryId));

        mapper.updateCategoryEntityWithCategory(categoryEntity, category);

        validators.validate(validationResult,
                validators.validateTextDataLength(categoryEntity),
                validators.validateValuesInNotNullColumns(categoryEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation categoryEntity error ", validationResult);
        }
        categoryRepository.save(categoryEntity);
    }

    @Override
    public void delete(Long categoryId) {
        CategoryEntity categoryEntity = categoryRepository.findById(categoryId).orElseThrow(
                () -> new NotFoundEntityException(Category.class, categoryId));
        categoryRepository.delete(categoryEntity);
    }

    @Override
    public Category get(Long categoryId) {
        CategoryEntity categoryEntity = categoryRepository.findById(categoryId).orElseThrow(
                () -> new NotFoundEntityException(Category.class, categoryId));
        return mapper.toDto(categoryEntity);
    }
}
