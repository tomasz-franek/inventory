package inventory.app.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import inventory.app.backend.entities.CategoryEntity;
import inventory.app.api.model.Category;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
  Category toDto(CategoryEntity entity);

  @NoIdMapping
  CategoryEntity toEntity(Category dto);

  @NoIdMapping
  void updateCategoryEntityWithCategory(@MappingTarget CategoryEntity entity, Category dto);

}
