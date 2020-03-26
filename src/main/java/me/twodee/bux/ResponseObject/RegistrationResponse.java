package me.twodee.bux.ResponseObject;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
public class RegistrationResponse
{
    Map<String, String> errors;
    boolean success;

    public RegistrationResponse(Map<String, String> errors)
    {
        this.errors = errors;
        this.success = false;
    }

    public RegistrationResponse(boolean success)
    {
        this.success = success;
    }
}
