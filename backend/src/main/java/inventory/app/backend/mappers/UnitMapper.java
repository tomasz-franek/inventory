package inventory.app.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import inventory.app.backend.entities.UnitEntity;
import inventory.app.api.model.Unit;

@Mapper(componentModel = "spring")
public interface UnitMapper {
  Unit toDto(UnitEntity entity);

  @NoIdMapping
  UnitEntity toEntity(Unit dto);

  @NoIdMapping
  void updateUnitEntityWithUnit(@MappingTarget UnitEntity entity, Unit dto);

}
