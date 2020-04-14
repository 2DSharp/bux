package me.twodee.bux.Factory;

import me.twodee.bux.DTO.User.PublicUserDTO;
import me.twodee.bux.Model.Entity.User;

public class UserDTOFactory
{
    public static PublicUserDTO buildPublicUser(User user)
    {
        return new PublicUserDTO(user.getName(), user.getUsername());
    }
}
