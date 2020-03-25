package me.twodee.bux.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import me.twodee.bux.BuxConfiguration;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.UserDTO;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Service.AccountService;
import org.junit.jupiter.api.Test;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AccountController.class)
@ImportAutoConfiguration(BuxConfiguration.class)
public class AccountControllerTest
{
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AccountService service;

    @Test
    public void testEmptyRequest() throws Exception
    {
        MvcResult mvcResult = this.mockMvc.perform(post("/accounts/create")).andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value(
                        "Malformed request. You either sent nothing or there is a formatting error."))
                .andReturn();

        assertThat(mvcResult.getResponse().getContentType(), equalTo("application/json"));
    }

    @Test
    public void testFailedRequest() throws Exception
    {
        doAnswer((Answer<Void>) invocation -> {

            UserDTO dto = invocation.getArgument(0, UserDTO.class);

            Map<String, String> errors = new HashMap<>();
            errors.put("username", "username.error");
            errors.put("email", "email.error");
            errors.put("password", "password.error");

            Notification note = new Notification();
            note.setErrors(errors);
            dto.setNotification(note);
            return null;
        }).when(service).register(any(UserDTO.class), any(User.Role.class));

        Map<String, String> map = new HashMap<>();
        map.put("username", "aas");

        this.mockMvc.perform(post("/accounts/create").characterEncoding("UTF-8").contentType(MediaType.APPLICATION_JSON)
                                     .content(asJsonString(map)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors").exists())
                .andExpect(jsonPath("$.errors.password", is("password.error")))
                .andExpect(jsonPath("$.errors.username", is("username.error")))
                .andExpect(jsonPath("$.errors.email", is("email.error")))
                .andExpect(jsonPath("$.errors.name").doesNotExist())
                .andExpect(jsonPath("$.success").value(false));
    }

    public static String asJsonString(final Object obj)
    {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}