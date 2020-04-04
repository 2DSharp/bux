package me.twodee.bux.DTO.User;

import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;

@Getter
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

}
