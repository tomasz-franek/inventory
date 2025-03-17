package inventory.app.backend.services;

import inventory.app.api.model.ConsumeProduct;
import inventory.app.api.model.ProductPrice;
import inventory.app.api.model.StorageItem;

import java.util.List;

public interface DictionaryService {
    List<StorageItem> itemsWithoutInventory();

    List<ConsumeProduct> getConsumeProductListInventoryCategory(Long idInventory, Long idCategory, Long idProduct);

    ProductPrice getProductPrice(Long idProduct);
}
