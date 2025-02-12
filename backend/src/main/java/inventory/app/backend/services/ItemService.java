package inventory.app.backend.services;

import inventory.app.api.model.Item;

import java.util.List;

public interface ItemService {
  List<Item> findAll();
}
