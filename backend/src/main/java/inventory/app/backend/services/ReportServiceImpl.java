package inventory.app.backend.services;

import inventory.app.api.model.ExpiredReportData;
import inventory.app.api.model.InventoryReportData;
import inventory.app.api.model.LastUsedData;
import inventory.app.backend.repositories.StorageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public List<LastUsedData> getLastUsedInventoryReportData(Long idInventory) {
        Pageable last20Items =
                PageRequest.of(0, 20, Sort.by("endDate").descending());
        return storageRepository.getLastUsedInventoryReportData(idInventory, last20Items);
    }

    @Override
    public List<ExpiredReportData> getExpiredInventoryReportData(Long idInventory) {
        return storageRepository.getExpiredInventoryReportData(idInventory);
    }
}
