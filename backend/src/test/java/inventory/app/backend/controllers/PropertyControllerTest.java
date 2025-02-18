package inventory.app.backend.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

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
                .andExpect(jsonPath("$.language").value("EN"))
                .andExpect(jsonPath("$.currency").value("USD"));
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
}