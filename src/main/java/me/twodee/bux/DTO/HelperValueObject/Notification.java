package me.twodee.bux.DTO.HelperValueObject;

import java.util.ArrayList;
import java.util.List;

public class Notification
{
    List<Error> errors = new ArrayList<>();

    public void addError(Error error)
    {
        errors.add(error);
    }

    public List<Error> getErrors()
    {
        return errors;
    }

    public void setErrors(List<Error> errors)
    {
        this.errors = errors;
    }

    public boolean hasErrors()
    {
        return !errors.isEmpty();
    }
}
