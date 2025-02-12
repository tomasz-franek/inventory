package inventory.app.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import inventory.app.api.InventoriesApi;
import inventory.app.api.model.Inventory;
import inventory.app.api.model.ResponseId;
import inventory.app.backend.services.InventoryService;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class InventoryController implements InventoriesApi {

    private final InventoryService inventoryService;

    @Override
    public ResponseEntity<List<Inventory>> getAllInventories() {
        return ResponseEntity.ok(inventoryService.findAll());
    }

    @Override
    public ResponseEntity<ResponseId> saveInventory(Inventory inventory) {
        ResponseId responseId = inventoryService.save(inventory);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(responseId.getId())
                .toUri();
        return ResponseEntity.created(location).body(responseId);
    }

    @Override
    public ResponseEntity<Void> updateInventory(Long inventoryId, Inventory inventory) {
        inventoryService.update(inventoryId, inventory);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> deleteInventory(Long inventoryId) {
        inventoryService.delete(inventoryId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Inventory> getInventory(Long inventoryId) {
        return ResponseEntity.ok(inventoryService.get(inventoryId));
    }
}
