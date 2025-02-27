package inventory.app.backend.services;

import inventory.app.api.model.InventoryReportData;

import java.util.List;

public interface ReportService {
    List<InventoryReportData> getInventoryReportData(Long idInventory);
}
