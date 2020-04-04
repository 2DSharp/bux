package me.twodee.bux.ResponseObject;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
public class LoginResponse
{
    private Map<String, String> errors;
    private boolean success = true;

    public LoginResponse(boolean success)
    {
        this.success = success;
    }

    public LoginResponse(Map<String, String> errors)
    {
        this.errors = errors;
        success = false;
    }
}
