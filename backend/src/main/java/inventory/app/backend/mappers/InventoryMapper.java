package inventory.app.backend.mappers;

import inventory.app.api.model.Inventory;
import inventory.app.backend.entities.InventoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface InventoryMapper {
  @Mapping(target = "idInventory", source = "id")
  Inventory toDto(InventoryEntity entity);

  @NoIdMapping
  InventoryEntity toEntity(Inventory dto);

  @NoIdMapping
  void updateInventoryEntityWithInventory(@MappingTarget InventoryEntity entity, Inventory dto);

}
