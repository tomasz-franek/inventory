package inventory.app.backend.services;

import inventory.app.api.model.Property;
import inventory.app.backend.entities.PropertyEntity;
import inventory.app.backend.exceptions.NotFoundEntityException;
import inventory.app.backend.mappers.PropertyMapper;
import inventory.app.backend.repositories.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {
    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;

    @Override
    public Property getPropertyByUserId(Long idUser) {
        PropertyEntity propertyEntity = propertyRepository.findByIdUser(idUser)
                .orElseThrow(() -> new NotFoundEntityException(Property.class, idUser));
        return propertyMapper.toDto(propertyEntity);
    }
}
