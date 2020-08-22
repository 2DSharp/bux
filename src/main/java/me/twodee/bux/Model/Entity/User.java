package me.twodee.bux.Model.Entity;


import lombok.ToString;
import me.twodee.bux.Util.CryptoUtil;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@ToString
public class User {
    public enum Role {
        ADMIN, LEADER, STANDARD
    }

    ;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Size(min = 3, max = 16, message = "{validation.username.size}")
    @Pattern(regexp = "^[a-zA-Z0-9_.-]*$", message = "{validation.username.pattern}")
    @NotBlank(message = "{validation.username.empty}")
    @Column(unique = true, nullable = false)
    private String username;

    @Pattern(regexp = "^[\\p{L}\\p{M}\\p{Pd} .'-]+$", message = "{validation.name.pattern}")
    @Size(min = 2, max = 255, message = "{validation.name.size}")
    @NotBlank(message = "{validation.name.empty}")
    @NotNull
    private String name;

    @Column(columnDefinition = "ENUM('ADMIN', 'LEADER', 'STANDARD')")
    @Enumerated(EnumType.STRING)
    private Role role = Role.STANDARD;

    @Email(message = "{validation.email.pattern}")
    @NotBlank(message = "{validation.email.empty}")
    @Column(unique = true, nullable = false)
    private String email;

    @Transient
    @NotBlank(message = "{validation.password.empty}")
    @Size(min = 8, message = "{validation.password.weak}")
    @Pattern(regexp = "^(?=.*[a-zA-Z]).{8,}$", message = "{validation.password.weak}")
    private String password;

    private String hashedPassword;

    public User(int id) {
        this.id = id;
    }

    public User(String username) {
        this.username = username;
    }

    public User() {
    }

    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        if (password != null) {
            this.hashedPassword = CryptoUtil.hashPassword(password);
        }
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public String getName() {
        return name;
    }

    public Role getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public int getId() {
        return id;
    }
}
