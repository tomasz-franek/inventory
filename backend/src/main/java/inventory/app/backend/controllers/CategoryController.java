package inventory.app.backend.controllers;

import inventory.app.api.CategoriesApi;
import inventory.app.api.model.Category;
import inventory.app.api.model.ResponseId;
import inventory.app.backend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class CategoryController implements CategoriesApi {

    private final CategoryService categoryService;

    @Override
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @Override
    public ResponseEntity<ResponseId> saveCategory(Category category) {
        ResponseId responseId = categoryService.save(category);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(responseId.getId())
                .toUri();
        return ResponseEntity.created(location).body(responseId);
    }

    @Override
    public ResponseEntity<Void> updateCategory(Long categoryId, Category category) {
        categoryService.update(categoryId, category);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> deleteCategory(Long categoryId) {
        categoryService.delete(categoryId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Category> getCategory(Long categoryId) {
        return ResponseEntity.ok(categoryService.get(categoryId));
    }
}
