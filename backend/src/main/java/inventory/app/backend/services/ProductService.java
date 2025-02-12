package inventory.app.backend.services;

import inventory.app.api.model.Product;
import inventory.app.api.model.ResponseId;

import java.util.List;

public interface ProductService {
    List<Product> findAll();

    Product get(Long productId);

    ResponseId save(Product product);

    void update(Long productId, Product product);

    void delete(Long productId);
}
