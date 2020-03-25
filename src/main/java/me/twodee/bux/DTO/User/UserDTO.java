package me.twodee.bux.DTO.User;

import me.twodee.bux.DTO.DataTransferObject;

public class UserDTO extends DataTransferObject
{
    private String name;
    private String username;
    private String email;
    private String password;


    public UserDTO(String name, String username, String email, String password)
    {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public UserDTO() {}

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
}
