package com.medimart.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medimart.server.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByUsernameAndPassword(String username, String password);
}