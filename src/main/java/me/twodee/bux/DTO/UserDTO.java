package me.twodee.bux.DTO;

public class UserDTO extends DataTransferObject
{
    private String name;
    private String username;
    private String email;
    private String password;

    enum Type {
        REGISTRATION, LOGIN, PUBLIC
    }
    private Type type;

    public UserDTO(String name, String username, String email, String password)
    {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.type = Type.REGISTRATION;
    }

    public UserDTO(String name, String username)
    {
        this.name = name;
        this.username = username;
        this.type = Type.PUBLIC;
    }

    public UserDTO(String username, String email, String password)
    {
        this.username = username;
        this.email = email;
        this.password = password;
        this.type = Type.LOGIN;
    }

    public String getName()
    {
        return name;
    }

    public String getUsername()
    {
        return username;
    }

    public String getEmail()
    {
        return email;
    }

    public String getPassword()
    {
        return password;
    }

    public Type getType()
    {
        return type;
    }
}
