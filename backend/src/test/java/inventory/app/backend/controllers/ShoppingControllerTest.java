package inventory.app.backend.controllers;

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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
class ShoppingControllerTest {
    public static final String SHOPPING_ENDPOINT_PATH = "/shopping";
    @Autowired
    private MockMvc mockMvc;

    public static final Long CORRECT_ID = 1L;
    public static final Long WRONG_ID = 999L;

    @Test
    public void getAllShopping_Should_ReturnResponse_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(get(SHOPPING_ENDPOINT_PATH).accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].idProduct").value(1))
                .andExpect(jsonPath("$[0].idShopping").value(1));
    }

    @Test
    public void getShopping_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(SHOPPING_ENDPOINT_PATH + "/{shoppingId}", CORRECT_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.idShopping").value(1))
                .andExpect(jsonPath("$.idUnit").value(1))
                .andExpect(jsonPath("$.idProduct").value(1))
                .andExpect(jsonPath("$.items").value(2));
    }

    @Test
    public void saveShopping_Should_ReturnId_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        post(SHOPPING_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "name":"Wash powder",
                                            "idProduct":1,
                                            "idUnit":1,
                                            "count":1,
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
    public void saveShopping_Should_ReturnNotFound_When_MethodIsCalledWithWrongIdProduct()
            throws Exception {
        mockMvc.perform(
                        post(SHOPPING_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "name":"Wash powder",
                                            "idProduct":999,
                                            "idUnit":1,
                                            "count":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Product with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    public void saveShopping_Should_ReturnNotFound_When_MethodIsCalledWithWrongIdUnit()
            throws Exception {
        mockMvc.perform(
                        post(SHOPPING_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "name":"Wash powder",
                                            "idProduct":1,
                                            "idUnit":999,
                                            "count":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Unit with id = '" + WRONG_ID + "' not found."));
    }


    @Test
    public void updateShopping_Should_ReturnId_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        patch(SHOPPING_ENDPOINT_PATH + "/{shoppingId}",
                                CORRECT_ID)
                                .content("""
                                        {
                                            "name":"Wash powder",
                                            "count":2,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    public void updateShopping_Should_ReturnError_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        patch(SHOPPING_ENDPOINT_PATH + "/{shoppingId}",
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
                        "Shopping with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    public void updateShopping_Should_ReturnError_When_MethodIsCalledWithTooLongString()
            throws Exception {
        mockMvc.perform(
                        patch(SHOPPING_ENDPOINT_PATH + "/{shoppingId}",
                                CORRECT_ID)
                                .content(String.format("""
                                                {
                                                    "name":"%s",
                                                    "count":1,
                                                    "optLock":0,
                                                    "idUnit": null
                                                }
                                                """,
                                        StringUtils.repeat('1', 1000)
                                ))
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(1)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Column 'name' can contain a maximum of 45 character(s) but it contains 1000"));
    }

    @Test
    public void updateShopping_Should_ReturnError_When_MethodIsCalledWithWrongUnitId()
            throws Exception {
        mockMvc.perform(
                        patch(SHOPPING_ENDPOINT_PATH + "/{shoppingId}",
                                CORRECT_ID)
                                .content("""
                                        {
                                            "name":"Wash powder",
                                            "active":1,
                                            "optLock":0,
                                            "idUnit": 999
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Unit with id = '999' not found."));
    }

    @Test
    public void saveShopping_Should_ReturnError_When_MethodIsCalledWithTooLongString()
            throws Exception {
        mockMvc.perform(
                        post(SHOPPING_ENDPOINT_PATH)
                                .content(String.format("""
                                                {
                                                    "name":"%s",
                                                    "idProduct":1,
                                                    "idUnit":1,
                                                    "count":1,
                                                    "optLock":0
                                                }
                                                """,
                                        StringUtils.repeat('1', 1000)
                                ))
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(1)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Column 'name' can contain a maximum of 45 character(s) but it contains 1000"));
    }

    @Test
    public void updateShopping_Should_ReturnError_When_MethodIsCalledWithNullValues()
            throws Exception {
        mockMvc.perform(
                        patch(SHOPPING_ENDPOINT_PATH + "/{shoppingId}",
                                CORRECT_ID)
                                .content(
                                        """
                                                {
                                                    "name":null,
                                                    "active":null,
                                                    "optLock":0
                                                }
                                                """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(2)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Value in the column 'name' is null"))
                .andExpect(jsonPath("$.errors[1].message").value(
                        "Value in the column 'count' is null"));
    }

    @Test
    public void saveShopping_Should_ReturnError_When_MethodIsCalledWithNullValues()
            throws Exception {
        mockMvc.perform(
                        post(SHOPPING_ENDPOINT_PATH)
                                .content(
                                        """
                                                {
                                                    "name":null,
                                                    "idProduct":1,
                                                    "idUnit":1,
                                                    "active":null,
                                                    "optLock":0
                                                }
                                                """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(2)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Value in the column 'name' is null"))
                .andExpect(jsonPath("$.errors[1].message").value(
                        "Value in the column 'count' is null"));
    }

    @Test
    public void saveShopping_Should_ReturnError_When_MethodIsCalledWithNullIdProductAndIdUnit()
            throws Exception {
        mockMvc.perform(
                        post(SHOPPING_ENDPOINT_PATH)
                                .content(
                                        """
                                                {
                                                    "idProduct":null,
                                                    "idUnit":null,
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
                        "idProduct is null"));
    }

    @Test
    public void deleteShopping_Should_ReturnNoContent_When_MethodIsCalledWithCorrectId()
            throws Exception {
        //when
        ResultActions actions = mockMvc.perform(
                        post(SHOPPING_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "name":"Wash powder",
                                            "idProduct":1,
                                            "idUnit":1,
                                            "count":1,
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
                        delete(SHOPPING_ENDPOINT_PATH + "/{shoppingId}",
                                id)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andExpect(content().string(""));

        mockMvc.perform(
                        get(SHOPPING_ENDPOINT_PATH + "/{shoppingId}",
                                id)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string(
                        "Shopping with id = '" + id + "' not found."));
    }

    @Test
    public void deleteShopping_Should_ReturnError_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        delete(SHOPPING_ENDPOINT_PATH + "/{shoppingId}",
                                WRONG_ID)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Shopping with id = '" + WRONG_ID + "' not found."));
    }
}