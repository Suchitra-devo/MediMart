package com.medimart.server.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    @GetMapping("/login")
    public String loginTest() {
        return "Login API Working";
    }

    @PostMapping("/login")
    public String login() {
        return "Login Successful";
    }

}