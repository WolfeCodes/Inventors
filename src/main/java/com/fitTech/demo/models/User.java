package com.fitTech.demo.models;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;

    @NotNull
    private String username;

    @NotNull
    private String pwHash;

    public User() {}

    public User(String username, String password) {
        this.username = username;
//        this.pwHash = encoder.encode(password);
    }

    public String getUsername() {
        return username;
    }

//    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

//    public boolean isMatchingPassword(String password) {
//        return encoder.matches(password, pwHash);
//    }
}
