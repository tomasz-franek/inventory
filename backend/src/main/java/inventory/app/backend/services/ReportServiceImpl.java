package inventory.app.backend.services;


import com.itextpdf.text.DocumentException;
import inventory.app.api.model.ExpiredReportData;
import inventory.app.api.model.InventoryReportData;
import inventory.app.api.model.Item;
import inventory.app.api.model.LastUsedData;
import inventory.app.api.model.NextDayExpiredData;
import inventory.app.api.model.Price;
import inventory.app.api.model.PriceCategoryData;
import inventory.app.api.model.ProductAvailabilityData;
import inventory.app.api.model.ProductPredictionData;
import inventory.app.api.model.ProductPrice;
import inventory.app.api.model.ProductPriceHistoryData;
import inventory.app.api.model.PurchasesData;
import inventory.app.api.model.Shopping;
import inventory.app.api.model.StorageReportDataRow;
import inventory.app.api.model.StorageValueHistoryData;
import inventory.app.api.model.Unit;
import inventory.app.backend.entities.ItemEntity;
import inventory.app.backend.mappers.ItemMapper;
import inventory.app.backend.mappers.ShoppingMapper;
import inventory.app.backend.mappers.UnitMapper;
import inventory.app.backend.pdf.ShoppingReport;
import inventory.app.backend.pdf.StorageReport;
import inventory.app.backend.repositories.ItemRepository;
import inventory.app.backend.repositories.ProductRepository;
import inventory.app.backend.repositories.ShoppingRepository;
import inventory.app.backend.repositories.StorageRepository;
import inventory.app.backend.repositories.UnitRepository;
import inventory.app.backend.utils.DataRowElement;
import inventory.app.backend.utils.ProductAvailability;
import inventory.app.backend.utils.StoragePrediction;
import inventory.app.backend.utils.StorageReportData;
import inventory.app.backend.utils.StorageValueHistoryListBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final StorageRepository storageRepository;
    private final ShoppingRepository shoppingRepository;
    private final UnitRepository unitRepository;
    private final ItemRepository itemRepository;
    private final StoragePrediction storagePrediction;
    private final ItemMapper itemMapper;
    private final ShoppingMapper shoppingMapper;
    private final UnitMapper unitMapper;
    private final ProductRepository productRepository;
    private final ShoppingReport shoppingReport;
    private final StorageReport storageReport;

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

    @Override
    public byte[] reportPdfShopping() throws Exception {
        List<Shopping> list = new ArrayList<>();
        shoppingRepository.findAll().forEach(e -> list.add(shoppingMapper.toDto(e)));
        List<Unit> units = new ArrayList<>();
        unitRepository.findAll().forEach(e -> units.add(unitMapper.toDto(e)));
        String filePath = generateShoppingPDF(list, units);
        return readFileBytes(filePath);
    }

    @Override
    public byte[] reportPdfExpired() throws Exception {
        List<DataRowElement> list = storageRepository.getExpiredProducts();
        StorageReportData storageReportData = new StorageReportData();
        storageReportData.prepareReportData(list);
        String filePath = generateStorageReportPDF(storageReportData, "Expired products");
        return readFileBytes(filePath);
    }

    @Override
    public byte[] reportPdfInventory() throws Exception {
        List<DataRowElement> list = storageRepository.getInventoryReportData();
        StorageReportData storageReportData = new StorageReportData();
        storageReportData.prepareReportData(list);
        String filePath = generateStorageReportPDF(storageReportData, "Full inventory");
        return readFileBytes(filePath);
    }

    private static byte[] readFileBytes(String filePath) throws IOException {
        File file = new File(filePath);
        if (file.exists() && file.isFile()) {
            try (FileInputStream inputStream = new FileInputStream(file)) {
                return inputStream.readAllBytes();
            }
        }
        return null;
    }

    private String generateShoppingPDF(Iterable<Shopping> data, List<Unit> units) throws IOException, DocumentException {
        String filePath = File.createTempFile("tmpShopping", "pdf").getPath();
        for (Shopping shopping : data) {
            storagePrediction.calculate();
            List<ProductPredictionData> predictionList = storagePrediction.prepareResponse();
            if (!predictionList.isEmpty()) {
                shopping.setUseBeforeDate(predictionList.getFirst().getPredictedAvailabilityDate());
            }
            ProductPrice price = productRepository.getProductPrice(shopping.getIdProduct());
            if (price != null) {
                shopping.setPrice(new Price());
                shopping.getPrice().setMinPrice(price.getMinPrice());
                shopping.getPrice().setMaxPrice(price.getMaxPrice());
                shopping.getPrice().setAveragePrice(price.getAveragePrice());
                shopping.getPrice().setLastPrice(price.getLastPrice());
            }

        }
        shoppingReport.generateShoppingReport(filePath, data, units);
        return filePath;
    }

    private String generateStorageReportPDF(StorageReportData data, String title) throws IOException, DocumentException {
        String filePath = File.createTempFile("tmpStorage", "pdf").getPath();
        storageReport.generateStorageReport(filePath, data, title);
        return filePath;
    }
}
