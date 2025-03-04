package inventory.app.backend.controllers;

import inventory.app.api.StoragesApi;
import inventory.app.api.model.Item;
import inventory.app.api.model.ResponseId;
import inventory.app.api.model.Storage;
import inventory.app.backend.services.ItemService;
import inventory.app.backend.services.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class StoragesController implements StoragesApi {

    private final StorageService storageService;
    private final ItemService itemService;

    @Override
    public ResponseEntity<List<Storage>> getAllStorages() {
        return ResponseEntity.ok(storageService.findAll());
    }

    @Override
    public ResponseEntity<Void> deleteStorage(Long storageId) {
        storageService.delete(storageId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<ResponseId> saveStorage(Storage storage) {
        ResponseId responseId = storageService.save(storage);
        for (int i = 0; i < storage.getItems(); i++) {
            Item item = new Item();
            item.setIdStorage(responseId.getId());
            item.setValidDate(storage.getValidDate());
            item.setInsertDate(storage.getInsertDate());
            item.setUsed(BigDecimal.ZERO);
            item.setOptLock(0);
            itemService.saveItem(item);
        }
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(responseId.getId())
                .toUri();
        return ResponseEntity.created(location).body(new ResponseId(storage.getIdStorage()));
    }

    @Override
    public ResponseEntity<Void> updateStorage(Long storageId, Storage storage) {
        storageService.update(storageId, storage);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Storage> getStorage(Long storageId) {
        return ResponseEntity.ok(storageService.get(storageId));
    }
}
