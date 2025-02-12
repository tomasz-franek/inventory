package inventory.app.backend.services;

import inventory.app.api.model.Category;
import inventory.app.api.model.ResponseId;

import java.util.List;

public interface CategoryService {
    List<Category> findAll();

    Category get(Long categoryId);

    ResponseId save(Category category);

    void update(Long categoryId, Category category);

    void delete(Long categoryId);
}
