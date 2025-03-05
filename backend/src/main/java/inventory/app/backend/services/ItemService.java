package inventory.app.backend.services;

import inventory.app.api.model.Item;
import inventory.app.api.model.ItemConsume;
import inventory.app.api.model.ResponseId;

import java.util.List;

public interface ItemService {
  List<Item> findAll();

  Item getItem(Long idItem);

  ResponseId saveItem(Item item);

  void updateItem(Long idItem, Item item);

  void updateItemByInventoryId(Long idItem, Long idInventory);

  void consumeItem(ItemConsume itemConsume);
}
