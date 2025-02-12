package inventory.app.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import inventory.app.api.ShoppingApi;
import inventory.app.api.model.ResponseId;
import inventory.app.api.model.Shopping;
import inventory.app.backend.services.ShoppingService;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class ShoppingController implements ShoppingApi {

    private final ShoppingService shoppingService;

    @Override
    public ResponseEntity<List<Shopping>> getAllShopping() {
        return ResponseEntity.ok(shoppingService.findAll());
    }

    @Override
    public ResponseEntity<ResponseId> saveShopping(Shopping shopping) {
        ResponseId responseId = shoppingService.save(shopping);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(responseId.getId())
                .toUri();
        return ResponseEntity.created(location).body(responseId);
    }

    @Override
    public ResponseEntity<Void> deleteShopping(Long shoppingId) {
        shoppingService.delete(shoppingId);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> updateShopping(Long shoppingId, Shopping shopping) {
        shoppingService.update(shoppingId, shopping);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Shopping> getShopping(Long shoppingId) {
        return ResponseEntity.ok(shoppingService.get(shoppingId));
    }
}
