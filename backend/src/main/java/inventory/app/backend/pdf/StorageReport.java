package inventory.app.backend.pdf;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import inventory.app.api.model.ProductValid;
import inventory.app.api.model.StorageReportDataRow;
import inventory.app.backend.utils.StorageReportData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class StorageReport extends PdfDocumentBasic {

    @Autowired
    private PdfTableHeader pdfTableHeader;
    private static final BaseColor colorHeader = new BaseColor(0xE5E4E2);
    private static final BaseColor colorAfterValidationDate = new BaseColor(0xF19CBB);

    public void generateStorageReport(final String fileName, StorageReportData reportData, String reportHeader) throws DocumentException, IOException {

        Document document = prepareStandardDocument();
        PdfWriter writer = PdfWriter.getInstance(document,
                new FileOutputStream(fileName));

        pdfTableHeader.setHeader(reportHeader);
        DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
        pdfTableHeader.setGenerateDate("Generated at:" + df.format(new Date()));
        writer.setPageEvent(pdfTableHeader);

        document.open();
        document.add(dataRows(reportData));
        document.close();
    }

    private Element dataRows(StorageReportData reportData) throws DocumentException, IOException {

        PdfPTable table = createTable(2, 2, 2);
        addCell(table, "Product");
        addCell(table, "Valid date");
        addCell(table, "Count");

        if (reportData != null) {
            Date currentDate = new Date();

            for (StorageReportDataRow row : reportData.getRows()) {
                addCell(table, row.getProductName(), colorHeader);
                addCell(table, "", colorHeader);
                addCell(table, "" + countSum(row.getValidList()), colorHeader);
                for (ProductValid productValid : row.getValidList()) {
                    addCell(table, "");
                    if (productValid.getValidDate() != null) {
                        if (currentDate.getTime() > productValid.getValidDate().toEpochDay()) {
                            addCell(table, productValid.getValidDate().toString(), colorAfterValidationDate);
                            addCell(table, "" + productValid.getCount(), colorAfterValidationDate);
                        } else {
                            addCellCenter(table, productValid.getValidDate().toString());
                            addCellCenter(table, "" + productValid.getCount());
                        }
                    } else {
                        addCellCenter(table, "");
                        addCellCenter(table, "" + productValid.getCount());
                    }

                }
            }
        }
        return table;
    }

    public int countSum(List<ProductValid> validList) {

        int sum = 0;
        for (ProductValid productValid : validList) {
            sum += productValid.getCount();
        }
        return sum;
    }
}
