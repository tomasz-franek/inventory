package inventory.app.backend.services;

import inventory.app.api.model.ExpiredReportData;
import inventory.app.api.model.InventoryReportData;
import inventory.app.api.model.Item;
import inventory.app.api.model.LastUsedData;
import inventory.app.api.model.ProductAvailabilityData;
import inventory.app.backend.entities.ItemEntity;
import inventory.app.backend.mappers.ItemMapper;
import inventory.app.backend.repositories.ItemRepository;
import inventory.app.backend.repositories.StorageRepository;
import inventory.app.backend.utils.ProductAvailability;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final StorageRepository storageRepository;
    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;

    @Override
    public List<InventoryReportData> getInventoryReportData(Long idInventory) {
        return storageRepository.getInventoryReportData(idInventory);
    }

    @Override
    public List<LastUsedData> getLastUsedInventoryReportData(Long idInventory) {
        Pageable last20Items =
                PageRequest.of(0, 20, Sort.by("endDate").descending());
        return storageRepository.getLastUsedInventoryReportData(idInventory, last20Items);
    }

    @Override
    public List<ExpiredReportData> getExpiredInventoryReportData(Long idInventory) {
        return storageRepository.getExpiredInventoryReportData(idInventory);
    }

    @Override
    public List<ProductAvailabilityData> getProductAvailabilityForPeriod(Long idProduct, Integer period) {
        List<ItemEntity> itemsItemEntities = itemRepository.findByProductId(idProduct);
        List<Item> items = new ArrayList<>();
        itemsItemEntities.forEach(itemEntity -> {
            items.add(itemMapper.toDto(itemEntity));
        });

        ProductAvailability productAvailability = new ProductAvailability(ProductAvailability.Period.DAY, period);
        productAvailability.calculate(items);
        productAvailability.sortAscending();
        return productAvailability.getList();
    }
}
