package inventory.app.backend.mappers;

import inventory.app.api.model.Property;
import inventory.app.backend.entities.PropertyEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

    @Mapping(target = "idProperty", source = "id")
    Property toDto(PropertyEntity entity);

    @NoIdMapping
    PropertyEntity toEntity(Property dto);

    @NoIdMapping
    void updatePropertyEntityWithProperty(@MappingTarget PropertyEntity entity, Property dto);
}
