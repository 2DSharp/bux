package me.twodee.bux.DTO.HelperValueObject;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Notification {
    Map<String, String> errors = new HashMap<>();
    @Getter
    @Setter
    private Object result;

    public void addError(Error error) {
        errors.put(error.getKey(), error.getMessage());
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors)
    {
        this.errors = errors;
    }

    @JsonGetter("hasErrors")
    public boolean hasErrors() {
        return !errors.isEmpty();
    }

}
