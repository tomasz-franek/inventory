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
class UnitControllerTest {
    public static final String UNITS_ENDPOINT_PATH = "/units";
    @Autowired
    private MockMvc mockMvc;
    public static final Long CORRECT_ID = 1L;
    public static final Long WRONG_ID = 999L;

    @Test
    public void getAllUnits_Should_ReturnResponse_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        get(UNITS_ENDPOINT_PATH)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(equalTo(3))))
                .andExpect(jsonPath("$[0].name").value("Kilogram"))
                .andExpect(jsonPath("$[0].symbol").value("Kg"));
    }

    @Test
    public void getUnit_Should_ReturnResponse_When_MethodIsCalledWithCorrectId()
            throws Exception {
        mockMvc.perform(
                        get(UNITS_ENDPOINT_PATH + "/{unitId}", CORRECT_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("Kilogram"))
                .andExpect(jsonPath("$.symbol").value("Kg"));
    }

    @Test
    public void getUnit_Should_ReturnNotFound_When_MethodIsCalledWithWrongId()
            throws Exception {
        mockMvc.perform(
                        get(UNITS_ENDPOINT_PATH + "/{unitId}", WRONG_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(content().string(
                        "Unit with id = '" + WRONG_ID + "' not found."));
    }

    @Test
    public void getAllUnitDefaults_Should_ReturnAllData_When_MethodIsCalled()
            throws Exception {
        mockMvc.perform(
                        get(UNITS_ENDPOINT_PATH + "/defaults", CORRECT_ID)
                                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].idProduct").value(2))
                .andExpect(jsonPath("$[0].idUnit").value(1))
                .andExpect(jsonPath("$[0].count").value(1.0));
    }
}