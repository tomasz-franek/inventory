package inventory.app.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import inventory.app.backend.mappers.ItemMapper;
import inventory.app.api.model.Item;
import inventory.app.backend.repositories.ItemRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository repository;

    private final ItemMapper mapper;

    @Override
    public List<Item> findAll() {
        List<Item> items = new ArrayList<>();
        repository.findAll().forEach(itemEntity ->
                items.add(mapper.toDto(itemEntity))
        );
        return items;
    }
}
