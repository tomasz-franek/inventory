package inventory.app.backend.pdf;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import inventory.app.api.model.Price;
import inventory.app.api.model.Shopping;
import inventory.app.api.model.Unit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ShoppingReport extends PdfDocumentBasic {

    private static final BaseColor colorHeader = new BaseColor(0xE5E4E2);
    @Autowired
    private PdfTableHeader pdfTableHeader;

    public ShoppingReport() {
        super();
    }


    public void generateShoppingReport(final String fileName, Iterable<Shopping> reportData, List<Unit> units) throws DocumentException, IOException {

        Document document = prepareStandardDocument();
        try (FileOutputStream fileOutputStream = new FileOutputStream(fileName)) {
            PdfWriter writer = PdfWriter.getInstance(document, fileOutputStream);

            pdfTableHeader.setHeader("Shopping report");
            DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
            pdfTableHeader.setGenerateDate("Generated at:" + df.format(new Date()));
            writer.setPageEvent(pdfTableHeader);

            document.open();
            document.add(dataRows(reportData, units));
            document.close();
        }
    }

    private Element dataRows(Iterable<Shopping> reportData, List<Unit> units) throws DocumentException, IOException {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        PdfPTable table = createTable(2, 2, 2, 2, 2);
        table.setHorizontalAlignment(Element.ALIGN_CENTER);
        addCellCenter(table, "Product");
        addCellCenter(table, "Count");
        addCellCenter(table, "Unit");
        addCellCenter(table, "Price Min / Max / Avg / Last");
        addCellCenter(table, "Date");

        if (reportData != null) {
            for (Shopping row : reportData) {
                addCell(table, row.getName(), colorHeader);
                addCell(table, row.getItems().toString(), colorHeader);
                if (row.getIdUnit() != null) {
                    if (row.getCount() != null) {
                        addCell(table, String.format("%d %s", row.getCount().intValue(), getName(units, row.getIdUnit())), colorHeader);
                    }
                } else {
                    addCell(table, "", colorHeader);
                }
                String priceStr = "";
                if (row.getPrice() != null) {
                    Price price = row.getPrice();
                    if (null != price.getLastPrice() && price.getLastPrice().compareTo(BigDecimal.ZERO) > 0) {
                        priceStr = String.format("%s / %s / %s / %s",
                                bigDecimal2String(price.getMinPrice()),
                                bigDecimal2String(price.getMaxPrice()),
                                bigDecimal2String(price.getAveragePrice()),
                                bigDecimal2String(price.getLastPrice()));
                    }
                }
                addCellCenter(table, priceStr);
                if (row.getPrice().getUseBeforeDate() != null) {
                    addCellCenter(table, df.format(row.getPrice().getUseBeforeDate()));
                } else {
                    addCellCenter(table, "");
                }
            }
        }
        return table;
    }

    private String getName(List<Unit> units, Long idUnit) {
        return units.stream().filter(unit -> {
                    assert unit.getIdUnit() != null;
                    return unit.getIdUnit().equals(idUnit);
                })
                .findFirst().map(Unit::getSymbol).orElse("");
    }
}
