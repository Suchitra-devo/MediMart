package com.medimart.server.controller;

import org.springframework.web.bind.annotation.*;
import com.medimart.server.dto.RegisterRequestDTO;
import com.medimart.server.dto.RegisterResponseDTO;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "http://localhost:4200")
public class RegisterController {

@PostMapping
public RegisterResponseDTO register(@RequestBody RegisterRequestDTO request) {

    if(request.getFirstName() == null || request.getPassword() == null) {
        return new RegisterResponseDTO("FAILED", "Required fields missing");
    }

    return new RegisterResponseDTO(
            "SUCCESS",
            "Registration successful"
    );
}
}