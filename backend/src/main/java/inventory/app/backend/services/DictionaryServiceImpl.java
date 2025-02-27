package inventory.app.backend.services;

import inventory.app.api.model.Item;
import inventory.app.backend.mappers.ItemMapper;
import inventory.app.backend.repositories.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DictionaryServiceImpl implements DictionaryService {
    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;

    @Override
    public List<Item> itemsWithoutInventory() {
        List<Item> items = new ArrayList<>();
        itemRepository.itemsWithoutInventory().forEach(
                i -> items.add(itemMapper.toDto(i))
        );
        return items;
    }
}
