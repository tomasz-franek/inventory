package inventory.app.backend.services;

import inventory.app.api.model.ExpiredReportData;
import inventory.app.api.model.InventoryReportData;

import java.util.List;

public interface ReportService {
    List<InventoryReportData> getInventoryReportData(Long idInventory);

    List<ExpiredReportData> getExpiredInventoryReportData(Long idInventory);
}
