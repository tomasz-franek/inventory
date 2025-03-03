package inventory.app.backend.controllers;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

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

    @Test
    @Disabled("need test data")
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
                .andExpect(jsonPath("$[0].productName").value("Oil"))
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
    @Disabled("need test data")
    void getExpiredInventoryReportData_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "expired/{idInventory}", CORRECT_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].idProduct").value(1))
                .andExpect(jsonPath("$[0].productName").value("Oil"))
                .andExpect(jsonPath("$[0].validDate", nullValue()));
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
    @Disabled("need test data")
    void getLastUsedInventoryReportData_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "lastUsed/{idInventory}", CORRECT_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].idProduct").value(1))
                .andExpect(jsonPath("$[0].productName").value("Oil"))
                .andExpect(jsonPath("$[0].validDate", nullValue()));
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
    @Disabled("need test data")
    void getStoragePrediction_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "storagePrediction")
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(222))));
    }

    @Test
    @Disabled("need test data")
    void getProductAvailabilityForPeriod_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "availability/{idProduct}/{period}", 1, 1)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(22))));
    }

    @Test
    @Disabled("need test data")
    void getNextDaysExpired_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "nextDaysExpired/{days}", 30)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(0))));
    }

    @Test
    @Disabled("need test data")
    void getStorageValueHistoryForInventory_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "storageValueHistory/{days}/{idInventory}", 30, 1)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(222))));
    }

    @Test
    @Disabled("need test data")
    void getStorageValueHistory_Should_EmptyReturnResponse_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(REPORT_ENDPOINT_PATH + "storageValueHistory/{days}", 30)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(222))));
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
                .andExpect(jsonPath("$", hasSize(equalTo(1))))
                .andExpect(jsonPath("$[0].price").value(2.99));
    }


}