package inventory.app.backend.controllers;

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
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
class DictionaryControllerTest {
    @Autowired
    private MockMvc mockMvc;
    public static final String DICTIONARY_ENDPOINT_PATH = "/dictionary/";

    @Test
    public void itemsWithoutInventory_Should_returnData_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        get(DICTIONARY_ENDPOINT_PATH + "itemsWithoutInventory")
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].productName").value("Sugar"))
                .andExpect(jsonPath("$[0].ids").isArray())
                .andExpect(jsonPath("$[0].ids", hasSize(equalTo(2))));
    }

    @Test
    public void getConsumeProductListInventoryCategoryProduct_Should_returnData_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        get(DICTIONARY_ENDPOINT_PATH + "consumeProducts/{idInventory}/{idCategory}/{idProduct}", 1, 1, 1)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[*].productName").value("Bean"));
    }

    @Test
    public void getConsumeProductListInventoryCategory_Should_returnData_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        get(DICTIONARY_ENDPOINT_PATH + "consumeProducts/{idInventory}/{idCategory}", 1, 1)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].productName").value("Bean"))
                .andExpect(jsonPath("$[0].idProduct").value(1));
    }

    @Test
    public void getProductPrice_Should_returnData_When_MethodIsCalledWithCorrectProductId()
            throws Exception {
        mockMvc.perform(
                        get(DICTIONARY_ENDPOINT_PATH + "productPrice/{idProduct}", 5)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.idProduct").value(5))
                .andExpect(jsonPath("$.maxPrice").value(2.99))
                .andExpect(jsonPath("$.minPrice").value(1.34))
                .andExpect(jsonPath("$.lastPrice").value(2.99))
                .andExpect(jsonPath("$.averagePrice").value(2.17));
    }
}