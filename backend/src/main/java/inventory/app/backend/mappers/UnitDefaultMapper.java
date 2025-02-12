package inventory.app.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import inventory.app.backend.entities.UnitDefaultEntity;
import inventory.app.api.model.UnitDefault;

@Mapper(componentModel = "spring")
public interface UnitDefaultMapper {

    UnitDefault toDto(UnitDefaultEntity entity);

    @NoIdMapping
    UnitDefaultEntity toEntity(UnitDefault dto);

    @NoIdMapping
    void updateUnitDefaultEntityWithUnitDefault(@MappingTarget UnitDefaultEntity entity, UnitDefault dto);

}
