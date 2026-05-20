package com.medimart.server.controller;

import org.springframework.web.bind.annotation.*;

import com.medimart.server.entity.Role;
import com.medimart.server.entity.User;
import com.medimart.server.service.UserService;

@RestController
@RequestMapping("/api/register")
@CrossOrigin("*")
public class RegisterController {

    private final UserService userService;

    public RegisterController(
            UserService userService
    ) {

        this.userService = userService;
    }

    @PostMapping
    public User register(
            @RequestBody User user
    ) {

        // DEFAULT ROLE
        if (user.getRole() == null) {

            user.setRole(
                Role.CUSTOMER
            );
        }

        // SAFETY VALIDATION
        if (
            user.getUsername() == null ||
            user.getUsername().trim().isEmpty()
        ) {

            throw new RuntimeException(
                "Username is required"
            );
        }

        if (
            user.getPhone() == null ||
            user.getPhone().trim().isEmpty()
        ) {

            throw new RuntimeException(
                "Phone number is required"
            );
        }

        if (
            user.getPassword() == null ||
            user.getPassword().trim().isEmpty()
        ) {

            throw new RuntimeException(
                "Password is required"
            );
        }

        return userService.register(user);
    }
}