package com.medimart.server.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medimart.server.entity.User;
import com.medimart.server.repository.UserRepository;
import com.medimart.server.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public User register(User user) {

        return userRepository.save(user);
    }

    @Override
    public User login(String username,
                      String password) {

        return userRepository
                .findByUsernameAndPassword(
                        username,
                        password)
                .orElse(null);
    }

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }
}