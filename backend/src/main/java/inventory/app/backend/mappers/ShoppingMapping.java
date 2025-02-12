package inventory.app.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import inventory.app.backend.entities.ShoppingEntity;
import inventory.app.api.model.Shopping;

@Mapper(componentModel = "spring")
public interface ShoppingMapping {

  @Mapping(target = "idProduct",source = "product.id")
  @Mapping(target = "idUnit",source = "unit.id")
  Shopping toDto(ShoppingEntity entity);

  @NoIdMapping
  @Mapping(target = "product",ignore = true)
  @Mapping(target = "unit",ignore = true)
  ShoppingEntity toEntity(Shopping dto);

  @NoIdMapping
  void updateShoppingEntityWithShopping(@MappingTarget ShoppingEntity entity, Shopping dto);
}
