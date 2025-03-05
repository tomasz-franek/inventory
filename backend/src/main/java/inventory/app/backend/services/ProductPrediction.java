package inventory.app.backend.services;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

@Getter
@Setter
@ToString
public class ProductPrediction {
    private static final long ONE_DAY_EPOCH = 24L * 60L * 60L;

    private final Long idProduct;
    private String productName;
    private LocalDate minimalProductBuyingDate = LocalDate.of(2200, 1, 1);
    private BigDecimal countUsed = BigDecimal.ZERO;
    private BigDecimal countItems = BigDecimal.ZERO;
    private BigDecimal available = BigDecimal.ZERO;
    private long predictedAvailabilityEpoch = 0;
    private LocalDate predictedAvailabilityDate = null;
    private Integer limitMax;
    private Integer limitMed;
    private Integer limitMin;

    public ProductPrediction(Long idProduct) {

        this.idProduct = idProduct;
    }

    public void calculatePredictedAvailabilityDate() {
        if (predictedAvailabilityDate == null) {
            long date = this.predictedAvailabilityEpoch;
            date -= (this.predictedAvailabilityEpoch % ONE_DAY_EPOCH);
            predictedAvailabilityDate = LocalDate.ofEpochDay(date / 1000);
        }
    }

    public void setPredictedAvailabilityEpoch(long predictedAvailabilityEpoch) {

        this.predictedAvailabilityEpoch = predictedAvailabilityEpoch;
        this.predictedAvailabilityDate = null;
        calculatePredictedAvailabilityDate();
    }

    public void addCountItems(long count) {

        this.countItems = countItems.add(BigDecimal.valueOf(count));
    }

    public void addUsed(BigDecimal used) {

        this.countUsed = countUsed.add(used);
        this.available = countItems.subtract(countUsed);
        this.available = available.setScale(2, RoundingMode.HALF_UP);
    }
}
