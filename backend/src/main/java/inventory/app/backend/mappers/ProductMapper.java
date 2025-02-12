package inventory.app.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import inventory.app.backend.entities.ProductEntity;
import inventory.app.api.model.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toDto(ProductEntity entity);

    @NoIdMapping
    ProductEntity toEntity(Product dto);

    @NoIdMapping
    void updateProductEntityWithProduct(@MappingTarget ProductEntity entity, Product dto);

}
