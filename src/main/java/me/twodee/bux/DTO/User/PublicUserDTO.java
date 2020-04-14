package me.twodee.bux.DTO.User;

import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;

@Getter
public class PublicUserDTO extends DataTransferObject
{
    private final String name;
    private final String username;

    public PublicUserDTO(String name, String username)
    {
        this.name = name;
        this.username = username;
    }
}
