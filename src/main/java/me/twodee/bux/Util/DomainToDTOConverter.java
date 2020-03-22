package me.twodee.bux.Util;

import me.twodee.bux.DTO.HelperValueObject.Error;
import me.twodee.bux.DTO.HelperValueObject.Notification;

import javax.validation.ConstraintViolation;
import java.util.Set;

public class DomainToDTOConverter
{
    public static <T> Notification convert(Set<ConstraintViolation<T>> violation)
    {
        Notification note = new Notification();
        violation.forEach(error -> note.addError(new Error(error.getPropertyPath().toString(), error.getMessage())));
        return note;
    }
}
