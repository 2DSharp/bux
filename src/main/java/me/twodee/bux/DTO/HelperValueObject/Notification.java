package me.twodee.bux.DTO.HelperValueObject;

import java.util.HashMap;
import java.util.Map;

public class Notification
{
    Map<String, String> errors = new HashMap<>();

    public void addError(Error error)
    {
        errors.put(error.getKey(), error.getMessage());
    }

    public Map<String, String> getErrors()
    {
        return errors;
    }

    public void setErrors(Map<String, String> errors)
    {
        this.errors = errors;
    }

    public boolean hasErrors()
    {
        return !errors.isEmpty();
    }
}
