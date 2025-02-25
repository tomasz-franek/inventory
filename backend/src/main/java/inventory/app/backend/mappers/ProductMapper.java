package inventory.app.backend.mappers;

import inventory.app.api.model.Product;
import inventory.app.backend.entities.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "idProduct", source = "id")
    Product toDto(ProductEntity entity);

    @NoIdMapping
    ProductEntity toEntity(Product dto);

    @NoIdMapping
    void updateProductEntityWithProduct(@MappingTarget ProductEntity entity, Product dto);

}
