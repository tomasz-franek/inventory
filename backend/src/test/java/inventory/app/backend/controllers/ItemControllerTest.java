package inventory.app.backend.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
class ItemControllerTest {
    public static final String ITEMS_UPDATE_ENDPOINT_PATH = "/items/update/{idItem}/inventory/{idInventory}";
    public static final String ITEMS_ENDPOINT_PATH = "/items";

    public static final Long CORRECT_ID = 1L;
    public static final Long WRONG_ID = 999L;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAllItems_Should_ReturnResponse_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        get(ITEMS_ENDPOINT_PATH)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].idStorage").value(1));
    }

    @Test
    void saveItem_Should_ReturnId_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        post(ITEMS_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "insertDate" : "2024-02-27",
                                            "idStorage" : 2,
                                            "used":0,
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
    void saveItem_Should_ReturnNotFound_When_MethodIsCalledWithNonExistingIdStorage()
            throws Exception {
        mockMvc.perform(
                        post(ITEMS_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "insertDate" : "2024-02-27",
                                            "idStorage" : 999,
                                            "used":0,
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Storage with id = '999' not found."));
    }

    @Test
    void saveItem_Should_ReturnNotFound_When_MethodIsCalledWithNonExistingIdInventory()
            throws Exception {
        mockMvc.perform(
                        post(ITEMS_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "insertDate" : "2024-02-27",
                                            "idStorage" : 1,
                                            "idInventory" : 999,
                                            "used":0,
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Inventory with id = '999' not found."));
    }

    @Test
    void saveItem_Should_ReturnBadRequest_When_MethodIsCalledWithNullInsertDate()
            throws Exception {
        mockMvc.perform(
                        post(ITEMS_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "insertDate" : null,
                                            "idStorage" : 1,
                                            "idInventory" : 1,
                                            "used":0,
                                            "active":1,
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
                        "Value in the column 'insertDate' is null"));

    }

    @Test
    void updateItem_Should_ReturnNoContent_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        patch(ITEMS_ENDPOINT_PATH + "/{itemId}",
                                CORRECT_ID)
                                .content("""
                                        {
                                            "insertDate" : "2024-02-27",
                                            "idStorage" : 1,
                                            "used":2,
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    void updateItem_Should_ReturnNotFound_When_MethodIsCalledWithWrongItemId()
            throws Exception {
        mockMvc.perform(
                        patch(ITEMS_ENDPOINT_PATH + "/{itemId}",
                                WRONG_ID)
                                .content("""
                                        {
                                            "insertDate" : "2024-02-27",
                                            "idStorage" : 1,
                                            "used":2,
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Item with id = '999' not found."));
    }


    @Test
    void updateItem_Should_ReturnBadRequest_When_MethodIsCalledWithInsertDateNull()
            throws Exception {
        mockMvc.perform(
                        patch(ITEMS_ENDPOINT_PATH + "/{itemId}",
                                CORRECT_ID)
                                .content("""
                                        {
                                            "insertDate" :null,
                                            "idStorage" : 1,
                                            "used":2,
                                            "active":1,
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
                        "Value in the column 'insertDate' is null"));
    }


    @Test
    void updateItemByInventoryId_Should_ReturnNoContent_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        patch(ITEMS_UPDATE_ENDPOINT_PATH,
                                CORRECT_ID,
                                CORRECT_ID)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    void updateItemByInventoryId_Should_ReturnError_When_WrongItemId()
            throws Exception {
        mockMvc.perform(
                        patch(ITEMS_UPDATE_ENDPOINT_PATH,
                                WRONG_ID,
                                CORRECT_ID)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Item with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    void updateItemByInventoryId_Should_ReturnError_When_WrongInventoryId()
            throws Exception {
        mockMvc.perform(
                        patch(ITEMS_UPDATE_ENDPOINT_PATH,
                                CORRECT_ID,
                                WRONG_ID)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Inventory with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    void consumeItem_Should_ReturnNoContent_When_ItemIsPartiallyConsumed()
            throws Exception {
        mockMvc.perform(
                        patch(ITEMS_ENDPOINT_PATH + "/consume",
                                CORRECT_ID,
                                WRONG_ID)
                                .accept(APPLICATION_JSON)
                                .content("""
                                        {
                                            "idItem": 1,
                                            "used": 12.0,
                                            "endDate": null
                                        }
                                        """)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    void consumeItem_Should_ReturnNotFound_When_MethodCalledWithWrongItemId()
            throws Exception {
        mockMvc.perform(
                        patch(ITEMS_ENDPOINT_PATH + "/consume")
                                .accept(APPLICATION_JSON)
                                .content("""
                                        {
                                            "idItem": 999,
                                            "used": 12.0,
                                            "endDate": null
                                        }
                                        """)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Item with id = '999' not found."));
    }

    @Test
    void getItem_Should_ReturnError_When_WrongItemId()
            throws Exception {
        mockMvc.perform(
                        get(ITEMS_ENDPOINT_PATH + "/{itemId}",
                                WRONG_ID)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Item with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    void getItem_Should_ReturnSelectedItem_When_CorrectItemId()
            throws Exception {
        mockMvc.perform(
                        get(ITEMS_ENDPOINT_PATH + "/{itemId}",
                                CORRECT_ID)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.idItem").value(1))
                .andExpect(jsonPath("$.name").value("Bean"));
    }
}