package me.twodee.bux.DTO.User;

import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;

@Getter
public class PublicUserDTO extends DataTransferObject
{
    private final String name;
    private final String username;
    private final int id;

    public PublicUserDTO(int id, String name, String username) {
        this.id = id;
        this.name = name;
        this.username = username;
    }
}
