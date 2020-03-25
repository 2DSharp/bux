package me.twodee.bux.Util;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class CryptoUtil
{
    public static String hashPassword(String password)
    {
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }

    public static boolean verifyPassword(String password, String hash)
    {
        return BCrypt.checkpw(password, hash);
    }
}
