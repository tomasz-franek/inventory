package inventory.app.backend.mappers;

import inventory.app.api.model.Shopping;
import inventory.app.backend.entities.ShoppingEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ShoppingMapper {

  @Mapping(target = "idProduct", source = "product.id")
  @Mapping(target = "idUnit", source = "unit.id")
  @Mapping(target = "idShopping", source = "id")
  @Mapping(target = "name", source = "product.name")
  Shopping toDto(ShoppingEntity entity);

  @NoIdMapping
  @Mapping(target = "product",ignore = true)
  @Mapping(target = "unit",ignore = true)
  ShoppingEntity toEntity(Shopping dto);

  @NoIdMapping
  void updateShoppingEntityWithShopping(@MappingTarget ShoppingEntity entity, Shopping dto);
}
