package com.medimart.server.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    private Long id;

    private String username;

    private String phone;

    private String email;

    @Column(length = 500)
    private String address;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User() {
    }

    public User(
            Long id,
            String username,
            String phone,
            String email,
            String address,
            String password,
            Role role
    ) {

        this.id = id;
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.password = password;
        this.role = role;
    }

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // USERNAME
    public String getUsername() {
        return username;
    }

    public void setUsername(
            String username
    ) {
        this.username = username;
    }

    // PHONE
    public String getPhone() {
        return phone;
    }

    public void setPhone(
            String phone
    ) {
        this.phone = phone;
    }

    // EMAIL
    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email = email;
    }

    // ADDRESS
    public String getAddress() {
        return address;
    }

    public void setAddress(
            String address
    ) {
        this.address = address;
    }

    // PASSWORD
    public String getPassword() {
        return password;
    }

    public void setPassword(
            String password
    ) {
        this.password = password;
    }

    // ROLE
    public Role getRole() {
        return role;
    }

    public void setRole(
            Role role
    ) {
        this.role = role;
    }
}