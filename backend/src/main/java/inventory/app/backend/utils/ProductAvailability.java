package inventory.app.backend.utils;

import inventory.app.api.model.Item;
import inventory.app.api.model.ProductAvailabilityData;
import lombok.Getter;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;


public class ProductAvailability {
    private final LocalDate minimalDate;
    private final LocalDate currentDate;
    @Getter
    private List<ProductAvailabilityData> list = new ArrayList<>();
    private final Period period;

    public ProductAvailability(Period period, Integer periodLength) {
        this.period = period;
        this.currentDate = LocalDate.now().plusDays(1);
        if (periodLength != null) {
            this.minimalDate = currentDate.plusDays(-periodLength);
        } else {
            this.minimalDate = null;
        }
    }

    public void calculate(final List<Item> items) {
        list = new ArrayList<>();
        String productName = "";
        if (!items.isEmpty()) {
            productName = items.getFirst().getName();
        }
        if (minimalDate != null) {
            generateList(minimalDate, currentDate, productName);
        }

        for (Item item : items) {
            LocalDate beginDate = item.getInsertDate();
            if (this.minimalDate != null && this.minimalDate.toEpochDay() > beginDate.toEpochDay()) {
                beginDate = minimalDate;
            }
            processItem(item, currentDate, beginDate);
        }
    }

    private void processItem(Item item, LocalDate date, LocalDate beginDate) {
        while (date.toEpochDay() >= beginDate.toEpochDay()) {
            ProductAvailabilityData productAvailabilityData = new ProductAvailabilityData(date, 0);
            int index = list.indexOf(productAvailabilityData);
            if (index > -1) {
                ProductAvailabilityData product = list.get(index);
                processProductAvailabilityData(item, date, product);
            } else {
                if (null == item.getEndDate() || item.getEndDate().toEpochDay() > date.toEpochDay()) {
                    productAvailabilityData.setCount(1);
                }
                list.add(productAvailabilityData);
            }
            date = previousDate(date);
        }
    }

    private void processProductAvailabilityData(Item item, LocalDate date, ProductAvailabilityData product) {
        if (null == item.getEndDate()) {
            BigDecimal notUsed = new BigDecimal(100).subtract(item.getUsed());
            notUsed = notUsed.divide(new BigDecimal(100), 2, RoundingMode.HALF_UP);
            product.setCount(product.getCount() + notUsed.intValue());
        } else {
            if (date.toEpochDay() >= item.getInsertDate().toEpochDay() &&
                    date.toEpochDay() < item.getEndDate().toEpochDay()) {
                product.setCount(product.getCount() + 1);
            }
        }
    }

    private void generateList(final LocalDate beginDate, final LocalDate date, String productName) {
        LocalDate calculationDate = date;
        while (calculationDate.toEpochDay() >= beginDate.toEpochDay()) {
            ProductAvailabilityData productAvailabilityData = new ProductAvailabilityData(calculationDate, 0);
            productAvailabilityData.setProductName(productName);
            if (!list.contains(productAvailabilityData)) {
                list.add(productAvailabilityData);
            }
            calculationDate = previousDate(calculationDate);
        }
    }

    private LocalDate previousDate(LocalDate date) {
        return switch (period) {
            case DAY -> date.plusDays(-1);
            case WEEK -> date.plusDays(-7);
            case MONTH -> date.plusMonths(-1);
        };
    }

    public void sortAscending() {
        list.sort(Comparator.comparing(ProductAvailabilityData::getAvailabilityDate));
    }

    public enum Period {
        DAY,
        MONTH,
        WEEK
    }
}
