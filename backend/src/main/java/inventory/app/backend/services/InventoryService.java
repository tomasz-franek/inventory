package inventory.app.backend.services;

import inventory.app.api.model.Inventory;
import inventory.app.api.model.ResponseId;

import java.util.List;

public interface InventoryService {
    List<Inventory> findAll();

    Inventory get(Long inventoryId);

    ResponseId save(Inventory inventory);

    void update(Long inventoryId, Inventory inventory);

    void delete(Long inventoryId);
}
