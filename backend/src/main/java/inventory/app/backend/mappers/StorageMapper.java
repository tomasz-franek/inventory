package inventory.app.backend.mappers;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import inventory.app.backend.entities.StorageEntity;
import inventory.app.api.model.Storage;

@Mapper(componentModel = "spring")
public interface StorageMapper {
  @Mapping(target = "idProduct", source = "product.id")
  @Mapping(target = "idUnit", source = "unit.id")
  Storage toDto(StorageEntity entity);

  @NoIdMapping
  StorageEntity toEntity(Storage dto);

  @NoIdMapping
  void updateStorageEntityWithStorage(@MappingTarget StorageEntity entity, Storage dto);
}
