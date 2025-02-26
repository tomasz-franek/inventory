package inventory.app.backend.mappers;

import inventory.app.api.model.Unit;
import inventory.app.backend.entities.UnitEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UnitMapper {
  @Mapping(target = "idUnit", source = "id")
  Unit toDto(UnitEntity entity);

  @NoIdMapping
  UnitEntity toEntity(Unit dto);

  @NoIdMapping
  void updateUnitEntityWithUnit(@MappingTarget UnitEntity entity, Unit dto);

}
