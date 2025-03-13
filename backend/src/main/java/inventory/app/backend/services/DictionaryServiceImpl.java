package inventory.app.backend.services;

import inventory.app.api.model.ConsumeProduct;
import inventory.app.api.model.Item;
import inventory.app.api.model.ProductPrice;
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
    public List<Item> itemsWithoutInventory() {
        List<Item> items = new ArrayList<>();
        itemRepository.itemsWithoutInventory().forEach(
                i -> items.add(itemMapper.toDto(i))
        );
        return items;
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
