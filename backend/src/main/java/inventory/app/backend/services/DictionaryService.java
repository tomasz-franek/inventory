package inventory.app.backend.services;

import inventory.app.api.model.ConsumeProduct;
import inventory.app.api.model.Item;

import java.util.List;

public interface DictionaryService {
    List<Item> itemsWithoutInventory();

    List<ConsumeProduct> getConsumeProductListInventoryCategory(Long idInventory, Long idCategory, Long idProduct);
}
