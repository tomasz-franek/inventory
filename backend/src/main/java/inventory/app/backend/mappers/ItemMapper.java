package inventory.app.backend.mappers;

import inventory.app.api.model.Item;
import inventory.app.backend.entities.ItemEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    @Mapping(target = "idItem", source = "id")
    Item toDto(ItemEntity entity);

    @NoIdMapping
    ItemEntity toEntity(Item dto);

    @NoIdMapping
    void updateItemEntityWithItem(@MappingTarget ItemEntity entity, Item dto);
}
