package inventory.app.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import inventory.app.api.ProductsApi;
import inventory.app.api.model.Product;
import inventory.app.api.model.ResponseId;
import inventory.app.backend.services.ProductService;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class ProductController implements ProductsApi {

    private final ProductService productService;

    @Override
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @Override
    public ResponseEntity<ResponseId> saveProduct(Product product) {
        ResponseId responseId = productService.save(product);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(responseId.getId())
                .toUri();
        return ResponseEntity.created(location).body(responseId);
    }

    @Override
    public ResponseEntity<Void> updateProduct(Long productId, Product product) {
        productService.update(productId, product);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> deleteProduct(Long productId) {
        productService.delete(productId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Product> getProduct(Long productId) {
        return ResponseEntity.ok(productService.get(productId));
    }
}
