package inventory.app.backend.utils;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class DataRowElement {
    Long idProduct;
    String productName;
    LocalDate validDate;
    Integer count;

    public DataRowElement() {
    }

    public DataRowElement(Long idProduct, String productName, LocalDate validDate, Long count) {
        this.idProduct = idProduct;
        this.productName = productName;
        this.validDate = validDate;
        this.count = count.intValue();
    }
}
