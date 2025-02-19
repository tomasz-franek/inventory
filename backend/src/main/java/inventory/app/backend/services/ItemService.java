package inventory.app.backend.services;

import inventory.app.api.model.Item;
import inventory.app.api.model.ResponseId;

import java.util.List;

public interface ItemService {
  List<Item> findAll();

  Item getItem(Long itemId);

  ResponseId saveItem(Item item);

  void updateItem(Long itemId, Item item);
}
