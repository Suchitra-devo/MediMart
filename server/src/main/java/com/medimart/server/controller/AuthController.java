package com.medimart.server.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.medimart.server.entity.User;
import com.medimart.server.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")

@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    // LOGIN

    @PostMapping("/login")
    public User login(@RequestBody User user) {

        Optional<User> existingUser =
            userRepository.findByUsername(user.getUsername());

        if(existingUser.isPresent()) {

            User dbUser = existingUser.get();

            boolean passwordMatch =
                passwordEncoder.matches(
                    user.getPassword(),
                    dbUser.getPassword()
                );

            if(passwordMatch) {

                return dbUser;
            }
        }

        throw new RuntimeException("Invalid Credentials");
    }
}