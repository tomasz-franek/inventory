package inventory.app.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import inventory.app.backend.entities.InventoryEntity;
import inventory.app.api.model.Inventory;

@Mapper(componentModel = "spring")
public interface InventoryMapper {
  Inventory toDto(InventoryEntity entity);

  @NoIdMapping
  InventoryEntity toEntity(Inventory dto);

  @NoIdMapping
  void updateInventoryEntityWithInventory(@MappingTarget InventoryEntity entity, Inventory dto);

}
