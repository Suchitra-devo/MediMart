package com.medimart.server.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medimart.server.dto.LoginRequestDTO;
import com.medimart.server.dto.LoginResponseDTO;

@RestController
@RequestMapping("/api")

public class LoginController {

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {

        if(request.getUsername().equals("admin") &&
           request.getPassword().equals("123")) {

            return new LoginResponseDTO(
                    "SUCCESS",
                    "Login successful",
                    request.getUsername()
            );
        }

        return new LoginResponseDTO(
                "FAILED",
                "Invalid credentials",
                null
        );
    }
}