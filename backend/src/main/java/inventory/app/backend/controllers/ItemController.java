package inventory.app.backend.controllers;

import inventory.app.api.ItemsApi;
import inventory.app.api.model.Item;
import inventory.app.api.model.ResponseId;
import inventory.app.backend.services.ItemService;
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
public class ItemController implements ItemsApi {
    private final ItemService itemService;

    @Override
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.findAll());
    }

    @Override
    public ResponseEntity<ResponseId> saveItem(Item item) {
        ResponseId responseId = itemService.saveItem(item);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(responseId.getId())
                .toUri();
        return ResponseEntity.created(location).body(responseId);
    }

    @Override
    public ResponseEntity<Void> updateItem(Long itemId, Item item) {
        itemService.updateItem(itemId, item);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> updateItemByInventoryId(Long idItem, Long idInventory) {
        itemService.updateItemByInventoryId(idItem, idInventory);
        return ResponseEntity.noContent().build();
    }


}
