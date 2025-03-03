package inventory.app.backend.controllers;

import inventory.app.api.ReportApi;
import inventory.app.api.model.ExpiredReportData;
import inventory.app.api.model.InventoryReportData;
import inventory.app.api.model.LastUsedData;
import inventory.app.api.model.NextDayExpiredData;
import inventory.app.api.model.PriceCategoryData;
import inventory.app.api.model.ProductAvailabilityData;
import inventory.app.api.model.ProductPredictionData;
import inventory.app.api.model.ProductPriceHistoryData;
import inventory.app.api.model.StorageValueHistoryData;
import inventory.app.backend.services.ReportService;
import inventory.app.backend.utils.StoragePrediction;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class ReportController implements ReportApi {
    private final ReportService reportService;
    private final StoragePrediction storagePrediction;

    @Override
    public ResponseEntity<List<InventoryReportData>> getInventoryReportData(Long idInventory) {
        return ResponseEntity.ok(reportService.getInventoryReportData(idInventory));
    }

    @Override
    public ResponseEntity<List<ExpiredReportData>> getExpiredInventoryReportData(Long idInventory) {
        return ResponseEntity.ok(reportService.getExpiredInventoryReportData(idInventory));
    }

    @Override
    public ResponseEntity<List<LastUsedData>> getLastUsedInventoryReportData(Long idInventory) {
        return ResponseEntity.ok(reportService.getLastUsedInventoryReportData(idInventory));
    }

    @Override
    public ResponseEntity<List<ProductPredictionData>> getStoragePrediction() {
        storagePrediction.calculate();
        return ResponseEntity.ok(storagePrediction.prepareResponse());
    }

    @Override
    public ResponseEntity<List<ProductAvailabilityData>> getProductAvailabilityForPeriod(Long idProduct, Integer period) {
        return ResponseEntity.ok(reportService.getProductAvailabilityForPeriod(idProduct, period));
    }

    @Override
    public ResponseEntity<List<NextDayExpiredData>> getNextDaysExpired(Integer days) {
        return ResponseEntity.ok(reportService.getNextDaysExpired(days));
    }

    @Override
    public ResponseEntity<List<StorageValueHistoryData>> getStorageValueHistoryForInventory(Integer days, Long idInventory) {
        return ResponseEntity.ok(reportService.getStorageValueHistory(days, idInventory));
    }

    @Override
    public ResponseEntity<List<StorageValueHistoryData>> getStorageValueHistory(Integer days) {
        return ResponseEntity.ok(reportService.getStorageValueHistory(days, null));
    }

    @Override
    public ResponseEntity<List<ProductPriceHistoryData>> getProductPriceHistory(Long idProduct) {
        return ResponseEntity.ok(reportService.getProductPriceHistory(idProduct));
    }

    @Override
    public ResponseEntity<List<PriceCategoryData>> getSumPricesByCategory() {
        return ResponseEntity.ok(reportService.getSumPricesByCategory());
    }
}
