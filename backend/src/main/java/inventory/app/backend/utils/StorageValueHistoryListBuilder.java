package inventory.app.backend.utils;

import inventory.app.api.model.StorageValueHistoryData;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class StorageValueHistoryListBuilder {

    private StorageValueHistoryListBuilder() {

    }

    public static List<StorageValueHistoryData> build(Integer days, List<StorageValueHistoryData> data) {
        List<StorageValueHistoryData> storageValueHistoryList = new ArrayList<>();
        LocalDate currentDate = LocalDate.now();
        BigDecimal currentValue = BigDecimal.ZERO.setScale(2, RoundingMode.UNNECESSARY);
        BigDecimal rowPrice;
        LocalDate rowDate;
        StorageValueHistoryData lastElement = null;
        for (StorageValueHistoryData element : data) {
            rowPrice = element.getPrice().setScale(2, RoundingMode.HALF_UP);
            rowDate = element.getOperationDate();

            currentValue = currentValue.add(rowPrice);

            lastElement = getStorageValueHistory(storageValueHistoryList, currentDate,
                    days, currentValue, rowPrice, rowDate, lastElement);
        }
        return storageValueHistoryList;
    }

    private static StorageValueHistoryData getStorageValueHistory(
            List<StorageValueHistoryData> storageValueHistoryList,
            LocalDate currentDate, Integer days, BigDecimal currentValue,
            BigDecimal rowPrice, LocalDate rowDate, final StorageValueHistoryData lastElement) {

        StorageValueHistoryData valueHistory = lastElement;
        if (rowDate.plusDays(days).isAfter(currentDate)) {
            if (storageValueHistoryList.isEmpty()) {
                valueHistory = addStorageValueHistory(storageValueHistoryList, rowDate, currentValue);
            } else if (null != valueHistory && valueHistory.getOperationDate().equals(rowDate)) {
                valueHistory.setPrice(valueHistory.getPrice().add(rowPrice));
            } else {
                valueHistory = addStorageValueHistory(storageValueHistoryList, rowDate, currentValue);
            }
        }
        return valueHistory;
    }

    private static StorageValueHistoryData addStorageValueHistory(
            List<StorageValueHistoryData> storageValueHistoryList, LocalDate date, BigDecimal value) {
        StorageValueHistoryData element = new StorageValueHistoryData(value, null, date);
        storageValueHistoryList.add(element);
        return element;
    }
}
