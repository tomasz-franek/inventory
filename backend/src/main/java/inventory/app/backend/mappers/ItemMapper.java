package inventory.app.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import inventory.app.backend.entities.ItemEntity;
import inventory.app.api.model.Item;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    Item toDto(ItemEntity entity);

    @NoIdMapping
    ItemEntity toEntity(Item dto);

    @NoIdMapping
    void updateItemEntityWithItem(@MappingTarget ItemEntity entity, Item dto);
}
