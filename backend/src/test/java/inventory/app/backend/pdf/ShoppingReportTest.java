package inventory.app.backend.pdf;

import com.itextpdf.text.DocumentException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
class ShoppingReportTest {

    @Autowired
    ShoppingReport shoppingReport;

    @Test
    void generateShoppingReport_shouldGeneratePdfFile_when_MethodIsCalled() throws DocumentException, IOException {
        String filePath = File.createTempFile("testShopping", ".pdf").getPath();
        shoppingReport.generateShoppingReport(filePath, new ArrayList<>(), new ArrayList<>());
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
        //file.delete();
        System.out.println(filePath);
    }
}