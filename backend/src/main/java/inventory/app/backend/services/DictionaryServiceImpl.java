package inventory.app.backend.services;

import inventory.app.api.model.ConsumeProduct;
import inventory.app.api.model.ProductPrice;
import inventory.app.api.model.StorageItem;
import inventory.app.backend.mappers.ItemMapper;
import inventory.app.backend.repositories.ItemRepository;
import inventory.app.backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DictionaryServiceImpl implements DictionaryService {
    private final ItemRepository itemRepository;
    private final ProductRepository productRepository;
    private final ItemMapper itemMapper;

    @Override
    public List<StorageItem> itemsWithoutInventory() {
        List<StorageItem> items = new ArrayList<>();
        itemRepository.itemsWithoutInventory().forEach(item -> {
            if (item.getId() != null) {
                StorageItem row = getRow(items, item.getId());
                row.setProductName(item.getStorage().getProduct().getName());
                row.getIds().add(item.getId());
                row.setValidDate(item.getValidDate());
            }
        });
        return items;
    }

    private StorageItem getRow(List<StorageItem> list, Long idStorage) {
        return list.stream().filter(i -> i.getIdStorage().equals(idStorage))
                .findFirst()
                .orElse(getStorageItem(list, idStorage));
    }

    private static StorageItem getStorageItem(List<StorageItem> list, Long idStorage) {
        StorageItem item = new StorageItem();
        item.setIdStorage(idStorage);
        list.add(item);
        return item;
    }

    @Override
    public List<ConsumeProduct> getConsumeProductListInventoryCategory(Long idInventory, Long idCategory, Long idProduct) {
        return itemRepository.getConsumeProductListInventoryCategory(idInventory, idCategory, idProduct);
    }

    @Override
    public ProductPrice getProductPrice(Long idProduct) {
        return productRepository.getProductPrice(idProduct);
    }
}
