package inventory.app.backend.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.nullValue;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
class ReportControllerTest {

    public static final String REPORT_ENDPOINT_PATH = "/report/";

    @Autowired
    private MockMvc mockMvc;

    public static final Long CORRECT_ID = 1L;
    public static final Long WRONG_ID = 999L;
    private static final String currentDate = LocalDate.now().toString();
    private static final String yesterdayDate = LocalDate.now().plusDays(-1).toString();

    @Test
    void getInventoryReportData_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "inventory/{idInventory}", CORRECT_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].idProduct").value(1))
                .andExpect(jsonPath("$[0].items").value(1))
                .andExpect(jsonPath("$[0].validDate", nullValue()));
    }

    @Test
    void getInventoryReportData_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "inventory/{idInventory}", WRONG_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(0))));
    }

    @Test
    void getExpiredInventoryReportData_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "expired/{idInventory}", 2)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].idProduct").value(5))
                .andExpect(jsonPath("$[0].productName").value("Milk"))
                .andExpect(jsonPath("$[0].validDate").value(currentDate));
    }

    @Test
    void getExpiredInventoryReportData_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "expired/{idInventory}", WRONG_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(0))));
    }

    @Test
    void getLastUsedInventoryReportData_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "lastUsed/{idInventory}", 2)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(1))))
                .andExpect(jsonPath("$[0].idProduct").value(1))
                .andExpect(jsonPath("$[0].productName").value("Bean"))
                .andExpect(jsonPath("$[0].endDate").value(currentDate));
    }

    @Test
    void getLastUsedInventoryReportData_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "lastUsed/{idInventory}", WRONG_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(0))));
    }

    @Test
    void getStoragePrediction_Should_EmptyListOfProducts_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "storagePrediction")
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(4))))
                .andExpect(jsonPath("$[0].idProduct").value(1))
                .andExpect(jsonPath("$[1].idProduct").value(2))
                .andExpect(jsonPath("$[2].idProduct").value(3))
                .andExpect(jsonPath("$[3].idProduct").value(5));
    }

    @Test
    void getProductAvailabilityForPeriod_Should_ReturnResponse_When_MethodIsCalledWithProductIdAndPeriod()
            throws Exception {
        int days = 60;
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "availability/{idProduct}/{period}", 1, days)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(days + 1))));
    }

    @Test
    void getNextDaysExpired_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "nextDaysExpired/{days}", 30)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(1))))
                .andExpect(jsonPath("$[0].productName").value("Milk"));
    }

    @Test
    void getStorageValueHistoryForInventory_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "storageValueHistory/{days}/{idInventory}", 30, 1)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(1))))
                .andExpect(jsonPath("$[0].operationDate").value(currentDate));
    }

    @Test
    void getStorageValueHistory_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "storageValueHistory/{days}", 30)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(2))))
                .andExpect(jsonPath("$[0].operationDate").value(yesterdayDate))
                .andExpect(jsonPath("$[1].operationDate").value(currentDate));
    }

    @Test
    void getProductPriceHistory_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {

        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "priceHistory/{idProduct}", 1)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(1))));
    }

    @Test
    void getSumPricesByCategory_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "sumPricesByCategory")
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(2))))
                .andExpect(jsonPath("$[0].categoryName").value("Food"))
                .andExpect(jsonPath("$[1].categoryName").value("Clothes"));
    }

    @Test
    void getListRecentPurchases_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "listPurchases/{days}", 120)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(3))));
    }

    @Test
    void getValidInventoryReport_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "inventory")
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(3))))
                .andExpect(jsonPath("$[0].productName").value("Bean"))
                .andExpect(jsonPath("$[0].idProduct").value(1))
                .andExpect(jsonPath("$[1].productName").value("Milk"))
                .andExpect(jsonPath("$[1].idProduct").value(5))
                .andExpect(jsonPath("$[2].productName").value("Sugar"))
                .andExpect(jsonPath("$[2].idProduct").value(2));
    }

    @Test
    void getExpiredReportData_Should_EmptyReturnResponse_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "expired")
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(1))))
                .andExpect(jsonPath("$[0].productName").value("Milk"))
                .andExpect(jsonPath("$[0].idProduct").value(5))
                .andExpect(jsonPath("$[0].validDate").value(currentDate));
    }


}