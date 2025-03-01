package inventory.app.backend.services;

import inventory.app.api.model.ExpiredReportData;
import inventory.app.api.model.InventoryReportData;
import inventory.app.api.model.LastUsedData;
import inventory.app.api.model.ProductAvailabilityData;

import java.util.List;

public interface ReportService {
    List<InventoryReportData> getInventoryReportData(Long idInventory);

    List<ExpiredReportData> getExpiredInventoryReportData(Long idInventory);

    List<LastUsedData> getLastUsedInventoryReportData(Long idInventory);

    List<ProductAvailabilityData> getProductAvailabilityForPeriod(Long idProduct, Integer period);
}
