package inventory.app.backend.services;

import inventory.app.api.model.ResponseId;
import inventory.app.api.model.Shopping;

import java.util.List;

public interface ShoppingService {
    List<Shopping> findAll();

    ResponseId save(Shopping shopping);

    Shopping get(Long shoppingId);

    void update(Long shoppingId, Shopping shopping);

    void delete(Long shoppingId);
}
