package com.medimart.server.service;

import java.util.List;

import com.medimart.server.entity.User;

public interface UserService {

    User register(User user);

    User login(String username, String password);

    List<User> getAllUsers();
}