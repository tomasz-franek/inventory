package inventory.app.backend.utils;

import inventory.app.api.model.Item;
import inventory.app.api.model.ProductAvailabilityData;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;


public class ProductAvailability {
    private static final BigDecimal ONE = new BigDecimal("1.00");
    private final Date minimalDate;
    private final Date currentDate;
    @Getter
    private List<ProductAvailabilityData> list = new ArrayList<>();
    private Period period;

    public ProductAvailability(Period period) {
        this(period, null);
    }

    public ProductAvailability(Period period, Integer periodLength) {
//        this.period = period;
//        this.currentDate = DateUtils.addDays(DateUtils.clearHours(new Date()), 1);
//        if (periodLength != null) {
//            this.minimalDate = DateUtils.addDays(currentDate, -periodLength);
//        } else {
//            this.minimalDate = null;
//        }
        this.minimalDate = null;
        this.currentDate = null;
    }

    public void calculate(final List<Item> items) {
//        list = new ArrayList<>();
//        if (minimalDate != null) {
//            generateList(minimalDate, currentDate);
//        }
//
//        for (Item item : items) {
//            Date beginDate = item.getInsertDate();
//            if (this.minimalDate != null && this.minimalDate.getTime() > beginDate.getTime()) {
//                beginDate = minimalDate;
//            }
//            processItem(item, currentDate, beginDate);
//        }
    }

    private void processItem(Item item, Date date, Date beginDate) {
//        while (date.getTime() >= beginDate.getTime()) {
//            ProductAvailabilityData productAvailabilityData = new ProductAvailabilityData(date, 0);
//            int index = list.indexOf(productAvailabilityData);
//            if (index > -1) {
//                ProductAvailabilityData product = list.get(index);
//                processProductAvailabilityData(item, date, product);
//            } else {
//                if (null == item.getEndDate() || item.getEndDate().getTime() > date.getTime()) {
//                    productAvailabilityData.setCount(ONE);
//                }
//                list.add(productAvailabilityData);
//            }
//            date = previousDate(date);
//        }
    }

    private void processProductAvailabilityData(Item item, Date date, ProductAvailabilityData product) {
//        if (null == item.getEndDate()) {
//            BigDecimal notUsed = new BigDecimal(100).subtract(item.getUsed());
//            notUsed = notUsed.divide(new BigDecimal(100), 2, RoundingMode.HALF_UP);
//            product.setCount(product.getCount().add(notUsed));
//        } else {
//            if (date.getTime() >= item.getInsertDate().getTime() &&
//                    date.getTime() < item.getEndDate().getTime()) {
//                product.setCount(product.getCount().add(ONE));
//            }
//        }
    }

    private void generateList(final Date beginDate, final Date date) {
//        Date calculationDate = date;
//        while (calculationDate.getTime() >= beginDate.getTime()) {
//            ProductAvailabilityData productAvailabilityData = new ProductAvailabilityData(calculationDate);
//            if (!list.contains(productAvailabilityData)) {
//                list.add(productAvailabilityData);
//            }
//            calculationDate = previousDate(calculationDate);
//        }
    }

    private Date previousDate(Date date) {
        return switch (period) {
//            case DAY -> DateUtils.addDays(date, -1);
//            case WEEK -> DateUtils.addDays(date, -7);
//            case MONTH -> DateUtils.addMonths(date, -1);
            default -> new Date(System.currentTimeMillis());
        };
    }

    public void sortAscending() {
        list.sort(Comparator.comparing(ProductAvailabilityData::getAvailabilityDate));
    }

    public enum Period {
        DAY, MONTH, WEEK;
    }
}
