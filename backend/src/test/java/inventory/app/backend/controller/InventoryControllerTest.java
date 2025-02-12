package inventory.app.backend.controller;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
class InventoryControllerTest {
    public static final String INVENTORIES_ENDPOINT_PATH = "/inventories";

    public static final Long CORRECT_ID = 1L;
    public static final Long WRONG_ID = 999L;
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getAllInventories_Should_ReturnResponse_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        get(INVENTORIES_ENDPOINT_PATH)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[0].name").value("House"))
                .andExpect(jsonPath("$[1].name").value("Garage"));
    }

    @Test
    public void getInventory_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(INVENTORIES_ENDPOINT_PATH + "/{inventoryId}", CORRECT_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("House"))
                .andExpect(jsonPath("$.description").value("House"))
                .andExpect(jsonPath("$.active").value(1));
    }

    @Test
    public void saveInventory_Should_ReturnId_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        post(INVENTORIES_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "name":"Garaż",
                                            "description":"Garaż",
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.id").isNumber());
    }

    @Test
    public void updateInventory_Should_ReturnId_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        patch(INVENTORIES_ENDPOINT_PATH + "/{inventoryId}",
                                CORRECT_ID)
                                .content("""
                                        {
                                            "name":"Garaż",
                                            "description":"Garaż",
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    public void updateInventory_Should_ReturnError_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        patch(INVENTORIES_ENDPOINT_PATH + "/{inventoryId}",
                                WRONG_ID)
                                .content("""
                                        {
                                            "name":"Garaż",
                                            "description":"Garaż",
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Inventory with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    public void updateInventory_Should_ReturnError_When_MethodIsCalledWithTooLongString()
            throws Exception {
        mockMvc.perform(
                        patch(INVENTORIES_ENDPOINT_PATH + "/{inventoryId}",
                                CORRECT_ID)
                                .content(String.format("""
                                                {
                                                    "name":"%s",
                                                    "description":"%s",
                                                    "active":1,
                                                    "optLock":0
                                                }
                                                """,
                                        StringUtils.repeat('1', 1000),
                                        StringUtils.repeat('2', 1000)
                                ))
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(2)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Column 'name' can contain a maximum of 45 character(s) but it contains 1000"))
                .andExpect(jsonPath("$.errors[1].message").value(
                        "Column 'description' can contain a maximum of 200 character(s) but it contains 1000"));
    }

    @Test
    public void saveInventory_Should_ReturnError_When_MethodIsCalledWithTooLongString()
            throws Exception {
        mockMvc.perform(
                        post(INVENTORIES_ENDPOINT_PATH)
                                .content(String.format("""
                                                {
                                                    "name":"%s",
                                                    "description":"%s",
                                                    "active":1,
                                                    "optLock":0
                                                }
                                                """,
                                        StringUtils.repeat('1', 1000),
                                        StringUtils.repeat('2', 1000)
                                ))
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(2)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Column 'name' can contain a maximum of 45 character(s) but it contains 1000"))
                .andExpect(jsonPath("$.errors[1].message").value(
                        "Column 'description' can contain a maximum of 200 character(s) but it contains 1000"));
    }

    @Test
    public void updateInventory_Should_ReturnError_When_MethodIsCalledWithNullValues()
            throws Exception {
        mockMvc.perform(
                        patch(INVENTORIES_ENDPOINT_PATH + "/{inventoryId}",
                                CORRECT_ID)
                                .content(
                                        """
                                                {
                                                    "name":null,
                                                    "description":null,
                                                    "active":null,
                                                    "optLock":0
                                                }
                                                """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(1)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Value in the column 'name' is null"));
    }

    @Test
    public void saveInventory_Should_ReturnError_When_MethodIsCalledWithNullValues()
            throws Exception {
        mockMvc.perform(
                        post(INVENTORIES_ENDPOINT_PATH)
                                .content(
                                        """
                                                {
                                                    "name":null,
                                                    "description":null,
                                                    "active":null,
                                                    "optLock":0
                                                }
                                                """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(1)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Value in the column 'name' is null"));
    }

    @Test
    public void deleteInventory_Should_ReturnNoContent_When_MethodIsCalledWithCorrectId()
            throws Exception {
        //when
        ResultActions actions = mockMvc.perform(
                        post(INVENTORIES_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "name":"Garaż",
                                            "description":"Garaż",
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.id").isNumber());
        DocumentContext docCtx = JsonPath.parse(actions.andReturn().getResponse().getContentAsString());
        JsonPath jsonPath = JsonPath.compile("$.id");
        Integer id = docCtx.read(jsonPath);

        //then
        mockMvc.perform(
                        delete(INVENTORIES_ENDPOINT_PATH + "/{inventoryId}",
                                id)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andExpect(content().string(""));

        mockMvc.perform(
                        get(INVENTORIES_ENDPOINT_PATH + "/{inventoryId}",
                                id)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string(
                        "Inventory with id = '" + id + "' not found."));
    }

    @Test
    public void deleteInventory_Should_ReturnError_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        delete(INVENTORIES_ENDPOINT_PATH + "/{inventoryId}",
                                WRONG_ID)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Inventory with id = '" + WRONG_ID + "' not found."));
    }
}