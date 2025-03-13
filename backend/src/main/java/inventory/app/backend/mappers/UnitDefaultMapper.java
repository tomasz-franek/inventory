package inventory.app.backend.mappers;

import inventory.app.api.model.UnitDefault;
import inventory.app.backend.entities.UnitDefaultEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UnitDefaultMapper {

    @Mapping(target = "idProduct", source = "product.id")
    @Mapping(target = "idUnitDefault", source = "id")
    @Mapping(target = "idUnit", source = "unit.id")
    UnitDefault toDto(UnitDefaultEntity entity);

    @NoIdMapping
    UnitDefaultEntity toEntity(UnitDefault dto);

    @NoIdMapping
    void updateUnitDefaultEntityWithUnitDefault(@MappingTarget UnitDefaultEntity entity, UnitDefault dto);

}
