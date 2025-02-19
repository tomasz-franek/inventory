package inventory.app.backend.controllers;

import inventory.app.api.ItemsApi;
import inventory.app.api.model.Item;
import inventory.app.api.model.ResponseId;
import inventory.app.backend.services.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class ItemController implements ItemsApi {
    private ItemService itemService;

    @Override
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.findAll());
    }

    @Override
    public ResponseEntity<ResponseId> saveItem(Item item) {
        return ResponseEntity.ok(itemService.saveItem(item));
    }

    @Override
    public ResponseEntity<Void> updateItem(Long itemId, Item item) {
        itemService.updateItem(itemId, item);
        return ResponseEntity.noContent().build();
    }
}
