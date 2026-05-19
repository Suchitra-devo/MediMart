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

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User register(@RequestBody User user) {

        if (user.getRole() == null) {
            user.setRole(Role.CUSTOMER);
        }

        return userService.register(user);
    }
}