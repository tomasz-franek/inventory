package inventory.app.backend.controller;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
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
class StoragesControllerTest {
    public static final String STORAGES_ENDPOINT_PATH = "/storages";
    @Autowired
    private MockMvc mockMvc;

    public static final Long CORRECT_ID = 1L;
    public static final Long WRONG_ID = 999L;

    @Test
    public void getAllStorages_Should_ReturnResponse_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(get(STORAGES_ENDPOINT_PATH).accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].idStorage").value(1))
                .andExpect(jsonPath("$[0].idProduct").value(1))
                .andExpect(jsonPath("$[0].idUnit").value(1));
    }

    @Test
    public void getStorage_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(STORAGES_ENDPOINT_PATH + "/{storageId}", CORRECT_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.idStorage").value(1))
                .andExpect(jsonPath("$.idProduct").value(1))
                .andExpect(jsonPath("$.idUnit").value(1));
    }

    @Test
    public void saveStorage_Should_ReturnId_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        post(STORAGES_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "idProduct":"2",
                                            "idUnit":1,
                                            "price":1.99,
                                            "insertDate":"2023-02-02",
                                            "used":0.0,
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
    public void updateStorage_Should_ReturnId_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        patch(STORAGES_ENDPOINT_PATH + "/{storageId}",
                                CORRECT_ID)
                                .content("""
                                        {
                                            "price":2.12,
                                            "insertDate":"2023-02-05",
                                            "used":1.0,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    public void updateStorage_Should_ReturnError_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        patch(STORAGES_ENDPOINT_PATH + "/{storageId}",
                                WRONG_ID)
                                .content("""
                                        {
                                            "name":"Wash powder",
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Storage with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    public void updateStorage_Should_ReturnError_When_MethodIsCalledWithNullValues()
            throws Exception {
        mockMvc.perform(
                        patch(STORAGES_ENDPOINT_PATH + "/{storageId}",
                                CORRECT_ID)
                                .content(
                                        """
                                                {
                                                    "idProduct":1,
                                                    "idUnit":1,
                                                    "optLock":0
                                                }
                                                """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(3)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Value in the column 'insertDate' is null"))
                .andExpect(jsonPath("$.errors[1].message").value(
                        "Value in the column 'used' is null"))
                .andExpect(jsonPath("$.errors[2].message").value(
                        "Value in the column 'price' is null"));
    }

    @Test
    public void saveStorage_Should_ReturnError_When_MethodIsCalledWithNullValues()
            throws Exception {
        mockMvc.perform(
                        post(STORAGES_ENDPOINT_PATH)
                                .content(
                                        """
                                                {
                                                    "idProduct":1,
                                                    "idUnit":1,
                                                    "optLock":0
                                                }
                                                """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(3)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Value in the column 'insertDate' is null"))
                .andExpect(jsonPath("$.errors[1].message").value(
                        "Value in the column 'used' is null"))
                .andExpect(jsonPath("$.errors[2].message").value(
                        "Value in the column 'price' is null"));
    }

    @Test
    public void saveStorage_Should_ReturnError_When_MethodIsCalledWithNullProductIdAndUnitId()
            throws Exception {
        mockMvc.perform(
                        post(STORAGES_ENDPOINT_PATH)
                                .content(
                                        """
                                                {
                                                    "idProduct":null,
                                                    "idUnit":null,
                                                    "price":0.0
                                                }
                                                """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(2)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "idProduct is null"))
                .andExpect(jsonPath("$.errors[1].message").value(
                        "idUnit is null"));
    }

    @Test
    public void deleteStorage_Should_ReturnNoContent_When_MethodIsCalledWithCorrectId()
            throws Exception {
        //when
        ResultActions actions = mockMvc.perform(
                        post(STORAGES_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "idProduct":"2",
                                            "idUnit":1,
                                            "price":2.04,
                                            "insertDate":"2023-02-02",
                                            "used":0.0,
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
                        delete(STORAGES_ENDPOINT_PATH + "/{storageId}",
                                id)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andExpect(content().string(""));

        mockMvc.perform(
                        get(STORAGES_ENDPOINT_PATH + "/{storageId}",
                                id)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string(
                        "Storage with id = '" + id + "' not found."));
    }

    @Test
    public void deleteStorage_Should_ReturnError_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        delete(STORAGES_ENDPOINT_PATH + "/{storageId}",
                                WRONG_ID)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Storage with id = '" + WRONG_ID + "' not found."));
    }
}