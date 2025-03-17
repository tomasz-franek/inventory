package inventory.app.backend.services;


import inventory.app.api.model.ExpiredReportData;
import inventory.app.api.model.InventoryReportData;
import inventory.app.api.model.Item;
import inventory.app.api.model.LastUsedData;
import inventory.app.api.model.NextDayExpiredData;
import inventory.app.api.model.PriceCategoryData;
import inventory.app.api.model.ProductAvailabilityData;
import inventory.app.api.model.ProductPriceHistoryData;
import inventory.app.api.model.PurchasesData;
import inventory.app.api.model.StorageReportDataRow;
import inventory.app.api.model.StorageValueHistoryData;
import inventory.app.backend.entities.ItemEntity;
import inventory.app.backend.mappers.ItemMapper;
import inventory.app.backend.repositories.ItemRepository;
import inventory.app.backend.repositories.ProductRepository;
import inventory.app.backend.repositories.StorageRepository;
import inventory.app.backend.utils.DataRowElement;
import inventory.app.backend.utils.ProductAvailability;
import inventory.app.backend.utils.StorageReportData;
import inventory.app.backend.utils.StorageValueHistoryListBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final StorageRepository storageRepository;
    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;
    private final ProductRepository productRepository;

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
        itemsItemEntities.forEach(itemEntity -> items.add(itemMapper.toDto(itemEntity)));
        String productName = "";
        if (!items.isEmpty()) {
            productName = items.getFirst().getName();
        }
        ProductAvailability productAvailability = new ProductAvailability(ProductAvailability.Period.DAY, period, productName);
        productAvailability.calculate(items);
        productAvailability.sortAscending();
        return productAvailability.getList();
    }

    @Override
    public List<NextDayExpiredData> getNextDaysExpired(Integer days) {
        LocalDate lastDayDate = LocalDate.now().plusDays(days);
        return storageRepository.getNextDaysExpired(lastDayDate);
    }

    @Override
    public List<StorageValueHistoryData> getStorageValueHistory(Integer days, Long idInventory) {
        List<StorageValueHistoryData> data = itemRepository.getStorageValueHistory(idInventory);
        data.sort(Comparator.comparing(StorageValueHistoryData::getOperationDate));
        return StorageValueHistoryListBuilder.build(days, data);
    }

    @Override
    public List<ProductPriceHistoryData> getProductPriceHistory(Long idProduct) {
        return productRepository.getProductPriceHistory(idProduct);
    }

    @Override
    public List<PriceCategoryData> getSumPricesByCategory() {
        return storageRepository.getSumPricesByCategory();
    }

    @Override
    public List<PurchasesData> getListRecentPurchases(Integer days, Long idInventory) {
        LocalDate lastDayDate = LocalDate.now().minusDays(days);
        return storageRepository.getListRecentPurchases(lastDayDate, idInventory);
    }

    @Override
    public List<StorageReportDataRow> getValidInventoryReport() {
        List<DataRowElement> list = storageRepository.getValidInventoryReport();
        StorageReportData storageReportData = new StorageReportData();
        storageReportData.prepareReportData(list);
        return storageReportData.getRows();
    }
}
