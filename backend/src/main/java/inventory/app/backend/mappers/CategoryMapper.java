package inventory.app.backend.mappers;

import inventory.app.api.model.Category;
import inventory.app.backend.entities.CategoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
  @Mapping(target = "idCategory", source = "id")
  Category toDto(CategoryEntity entity);

  @NoIdMapping
  CategoryEntity toEntity(Category dto);

  @NoIdMapping
  void updateCategoryEntityWithCategory(@MappingTarget CategoryEntity entity, Category dto);

}
