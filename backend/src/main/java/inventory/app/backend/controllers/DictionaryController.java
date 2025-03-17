package inventory.app.backend.controllers;

import inventory.app.api.DictionaryApi;
import inventory.app.api.model.ConsumeProduct;
import inventory.app.api.model.ProductPrice;
import inventory.app.api.model.StorageItem;
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
    public ResponseEntity<List<StorageItem>> itemsWithoutInventory() {
        return ResponseEntity.ok(dictionaryService.itemsWithoutInventory());
    }

    @Override
    public ResponseEntity<List<ConsumeProduct>> getConsumeProductListInventoryCategoryProduct(Long idInventory, Long idCategory, Long idProduct) {
        return ResponseEntity.ok(dictionaryService.getConsumeProductListInventoryCategory(idInventory, idCategory, idProduct));
    }

    @Override
    public ResponseEntity<List<ConsumeProduct>> getConsumeProductListInventoryCategory(Long idInventory, Long idCategory) {
        return ResponseEntity.ok(dictionaryService.getConsumeProductListInventoryCategory(idInventory, idCategory, null));
    }

    @Override
    public ResponseEntity<ProductPrice> getProductPrice(Long idProduct) {
        return ResponseEntity.ok(dictionaryService.getProductPrice(idProduct));
    }
}
