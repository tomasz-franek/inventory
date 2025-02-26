package inventory.app.backend.services;

import inventory.app.api.model.Property;
import inventory.app.backend.entities.PropertyEntity;
import inventory.app.backend.exceptions.NotFoundEntityException;
import inventory.app.backend.exceptions.ValidationException;
import inventory.app.backend.mappers.PropertyMapper;
import inventory.app.backend.repositories.PropertyRepository;
import inventory.app.backend.validation.ValidationResult;
import inventory.app.backend.validation.Validators;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {
    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;
    private final Validators validators;

    @Override
    public Property getPropertyByUserId(Long idUser) {
        PropertyEntity propertyEntity = propertyRepository.findByIdUser(idUser)
                .orElseThrow(() -> new NotFoundEntityException(Property.class, idUser));
        return propertyMapper.toDto(propertyEntity);
    }

    @Override
    public void updateProperty(Long userId, Property property) {
        ValidationResult validationResult = new ValidationResult();
        Supplier<ValidationResult.Context> contextSupplier = ValidationResult.Context.contextSupplier(property);
        PropertyEntity propertyEntity = propertyRepository.findByIdUser(userId).orElseThrow(
                () -> new NotFoundEntityException(Property.class, userId));
        propertyMapper.updatePropertyEntityWithProperty(propertyEntity, property);

        validators.validate(validationResult,
                validators.validateTextDataLength(propertyEntity),
                validators.validateValuesInNotNullColumns(propertyEntity, contextSupplier)
        );

        if (validationResult.isFailing()) {
            throw new ValidationException("Validation productEntity error ", validationResult);
        }
        propertyRepository.save(propertyEntity);
    }
}
