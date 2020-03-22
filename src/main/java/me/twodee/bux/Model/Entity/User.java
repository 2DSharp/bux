package me.twodee.bux.Model.Entity;


import org.springframework.security.crypto.bcrypt.BCrypt;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
public class User
{
    public enum Role {
        ADMIN, LEADER, STANDARD
    };

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Size(min = 3, max = 16, message = "Username must be between 3 to 16 characters")
    @Pattern(regexp = "^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$", message = "Username must be an alphanumeric string, contain one letter and no spaces")
    @NotBlank
    @Column(unique = true)
    private String username;

    @Pattern(regexp = "^[\\p{L}\\p{M}\\p{Pd} .'-]+$", message = "Only alphabets, spaces and dots allowed in your name")
    @Size(min = 2, max = 255, message = "Please keep your name in 2-255 characters")
    @NotBlank
    private String name;

    @Column(columnDefinition = "ENUM('ADMIN', 'LEADER', 'STANDARD')")
    @Enumerated(EnumType.STRING)
    private Role role = Role.STANDARD;

    @Email
    @NotBlank
    @Column(unique = true)
    private String email;

    @Transient
    @NotBlank(message = "Password can't be empty")
    @Size(min = 8, message = "Password too weak")
    @Pattern(regexp = "^(?=.*[a-zA-Z]).{8,}$", message = "Password too weak")
    private  String password;

    private String hashedPassword;

    public User()
    {
    }

    public User(String name, String username, String email, String password)
    {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(12));
    }

    public void setRole(Role role)
    {
        this.role = role;
    }

    public String getUsername()
    {
        return username;
    }

    public String getName()
    {
        return name;
    }

    public Role getRole()
    {
        return role;
    }

    public String getEmail()
    {
        return email;
    }

    public String getHashedPassword()
    {
        return hashedPassword;
    }

    public int getId()
    {
        return id;
    }
}
