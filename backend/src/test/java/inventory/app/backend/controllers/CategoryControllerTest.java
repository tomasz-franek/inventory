package inventory.app.backend.controllers;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
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
class CategoryControllerTest {
    public static final String CATEGORIES_ENDPOINT_PATH = "/categories";
    @Autowired
    private MockMvc mockMvc;
    public static final Long CORRECT_ID = 1L;
    public static final Long WRONG_ID = 999L;

    @Test
    public void getAllCategories_Should_ReturnResponse_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        get(CATEGORIES_ENDPOINT_PATH)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[0].name").value("Food"))
                .andExpect(jsonPath("$[1].name").value("Clothes"));
    }

    @Test
    public void getCategory_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(CATEGORIES_ENDPOINT_PATH + "/{categoryId}", CORRECT_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("Food"))
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    public void saveCategory_Should_ReturnId_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        post(CATEGORIES_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "name":"Medicines",
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
    public void updateCategory_Should_ReturnId_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        patch(CATEGORIES_ENDPOINT_PATH + "/{categoryId}",
                                CORRECT_ID)
                                .content("""
                                        {
                                            "idCategory": 1,
                                            "name":"Food",
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    public void updateCategory_Should_ReturnError_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        patch(CATEGORIES_ENDPOINT_PATH + "/{categoryId}",
                                WRONG_ID)
                                .content("""
                                        {
                                            "name":"Medicines",
                                            "active":1,
                                            "optLock":0
                                        }
                                        """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Category with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    public void updateCategory_Should_ReturnError_When_MethodIsCalledWithTooLongString()
            throws Exception {
        mockMvc.perform(
                        patch(CATEGORIES_ENDPOINT_PATH + "/{categoryId}",
                                CORRECT_ID)
                                .content(String.format("""
                                                {
                                                    "name":"%s",
                                                    "active":1,
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
                        "Column 'name' can contain a maximum of 100 character(s) but it contains 1000"));
    }

    @Test
    public void saveCategory_Should_ReturnError_When_MethodIsCalledWithTooLongString()
            throws Exception {
        mockMvc.perform(
                        post(CATEGORIES_ENDPOINT_PATH)
                                .content(String.format("""
                                                {
                                                    "name":"%s",
                                                    "active":1,
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
                        "Column 'name' can contain a maximum of 100 character(s) but it contains 1000"));
    }

    @Test
    public void updateCategory_Should_ReturnError_When_MethodIsCalledWithNullValues()
            throws Exception {
        mockMvc.perform(
                        patch(CATEGORIES_ENDPOINT_PATH + "/{categoryId}",
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
                .andExpect(jsonPath("$.errors", hasSize(1)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Value in the column 'name' is null"));
    }

    @Test
    public void saveCategory_Should_ReturnError_When_MethodIsCalledWithNullValues()
            throws Exception {
        mockMvc.perform(
                        post(CATEGORIES_ENDPOINT_PATH)
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
                .andExpect(jsonPath("$.errors", hasSize(1)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Value in the column 'name' is null"));
    }

    @Test
    public void deleteCategory_Should_ReturnNoContent_When_MethodIsCalledWithCorrectId()
            throws Exception {
        //when
        ResultActions actions = mockMvc.perform(
                        post(CATEGORIES_ENDPOINT_PATH)
                                .content("""
                                        {
                                            "name":"Lekarstwa",
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
                        delete(CATEGORIES_ENDPOINT_PATH + "/{categoryId}",
                                id)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andExpect(content().string(""));

        mockMvc.perform(
                        get(CATEGORIES_ENDPOINT_PATH + "/{categoryId}",
                                id)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string(
                        "Category with id = '" + id + "' not found."));
    }

    @Test
    public void deleteCategory_Should_ReturnError_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        delete(CATEGORIES_ENDPOINT_PATH + "/{categoryId}",
                                WRONG_ID)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Category with id = '" + WRONG_ID + "' not found."));
    }

}