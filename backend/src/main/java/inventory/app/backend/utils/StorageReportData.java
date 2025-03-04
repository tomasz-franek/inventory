package inventory.app.backend.utils;

import inventory.app.api.model.ProductValid;
import inventory.app.api.model.StorageReportDataRow;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class StorageReportData {
    private final List<StorageReportDataRow> rows = new ArrayList<>();

    public void prepareReportData(List<DataRowElement> list) {
        list.forEach(element -> {
            ProductValid productValid = new ProductValid();
            productValid.validDate(element.getValidDate());
            productValid.count(element.getCount());
            StorageReportDataRow row = getRow(element.getIdProduct(), element.getIdCategory());
            row.productName(element.getProductName());
            row.getValidList().add(productValid);
        });
    }

    private StorageReportDataRow getRow(Long idProduct, Long idCategory) {

        for (StorageReportDataRow row : rows) {
            if (row.getIdProduct().equals(idProduct)) {
                return row;
            }
        }
        StorageReportDataRow row = new StorageReportDataRow();
        row.idProduct(idProduct);
        row.idCategory(idCategory);
        this.rows.add(row);
        return row;
    }
}
