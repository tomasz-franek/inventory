package inventory.app.backend.services;

import inventory.app.api.model.ExpiredReportData;
import inventory.app.api.model.InventoryReportData;
import inventory.app.backend.repositories.StorageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final StorageRepository storageRepository;

    @Override
    public List<InventoryReportData> getInventoryReportData(Long idInventory) {
        return storageRepository.getInventoryReportData(idInventory);
    }

    @Override
    public List<ExpiredReportData> getExpiredInventoryReportData(Long idInventory) {
        return storageRepository.getExpiredInventoryReportData(idInventory);
    }
}
