package inventory.app.backend.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.isOneOf;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
class PropertyControllerTest {
    public static final String PROPERTY_ENDPOINT_PATH = "/properties/{userId}";
    @Autowired
    private MockMvc mockMvc;
    public static final Long CORRECT_ID = 1L;
    public static final Long WRONG_ID = 999L;

    @Test
    public void getProperty_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(PROPERTY_ENDPOINT_PATH, CORRECT_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.language").value("en"))
                .andExpect(jsonPath("$.currency", isOneOf("USD", "GBP")));
    }

    @Test
    public void getProperty_Should_ReturnResponse_When_MethodIsCalledWithIncorrectId()
            throws Exception {
        mockMvc.perform(
                        get(PROPERTY_ENDPOINT_PATH, WRONG_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(status().isNotFound())
                .andExpect(content().string(
                        "Property with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    public void updateProperty_Should_ReturnResponse_When_MethodIsCalledWithIncorrectId()
            throws Exception {
        mockMvc.perform(
                        patch(PROPERTY_ENDPOINT_PATH, CORRECT_ID)
                                .accept(APPLICATION_JSON)
                                .content(
                                        """
                                                {
                                                    "idProperty":1,
                                                    "idUser":1,
                                                    "language":"en",
                                                    "currency":"GBP"
                                                }
                                                """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    public void updateProperty_Should_ReturnNotFound_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        patch(PROPERTY_ENDPOINT_PATH, WRONG_ID)
                                .accept(APPLICATION_JSON)
                                .content(
                                        """
                                                {
                                                    "idProperty":1,
                                                    "idUser":1,
                                                    "language":"en",
                                                    "currency":"GBP"
                                                }
                                                """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string(
                        "Property with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    public void updateProperty_Should_ReturnBadRequest_When_MethodIsCalledWithLongText()
            throws Exception {
        mockMvc.perform(
                        patch(PROPERTY_ENDPOINT_PATH, CORRECT_ID)
                                .accept(APPLICATION_JSON)
                                .content(
                                        """
                                                {
                                                    "idProperty":1,
                                                    "idUser":1,
                                                    "language":"enxxxxxx",
                                                    "currency":"GBPxxxxxx"
                                                }
                                                """)
                                .accept(APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.errors").isArray())
                .andExpect(jsonPath("$.errors", hasSize(2)))
                .andExpect(jsonPath("$.errors[0].message").value(
                        "Column 'currency' can contain a maximum of 3 character(s) but it contains 9"))
                .andExpect(jsonPath("$.errors[1].message").value(
                        "Column 'language' can contain a maximum of 2 character(s) but it contains 8"));
    }
}