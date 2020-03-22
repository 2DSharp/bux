package me.twodee.bux.DTO.HelperValueObject;

public class Error
{
    private String key;
    private String message;

    public Error(String key, String message)
    {
        this.key = key;
        this.message = message;
    }

    public String getKey()
    {
        return key;
    }

    public String getMessage()
    {
        return message;
    }
}
