package inventory.app.backend.mappers;


import inventory.app.api.model.Storage;
import inventory.app.backend.entities.StorageEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface StorageMapper {
  @Mapping(target = "idProduct", source = "product.id")
  @Mapping(target = "idUnit", source = "unit.id")
  @Mapping(target = "idStorage", source = "id")
  @Mapping(target = "idCategory", source = "product.category.id")
  Storage toDto(StorageEntity entity);

  @NoIdMapping
  StorageEntity toEntity(Storage dto);

  @NoIdMapping
  void updateStorageEntityWithStorage(@MappingTarget StorageEntity entity, Storage dto);
}
