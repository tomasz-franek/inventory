package inventory.app.backend.controllers;

import inventory.app.api.DictionaryApi;
import inventory.app.api.model.Item;
import inventory.app.backend.services.DictionaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class DictionaryController implements DictionaryApi {
    private final DictionaryService dictionaryService;

    @Override
    public ResponseEntity<List<Item>> itemsWithoutInventory() {
        return ResponseEntity.ok(dictionaryService.itemsWithoutInventory());
    }
}
