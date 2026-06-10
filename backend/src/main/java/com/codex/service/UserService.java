package com.codex.service;

import com.codex.exception.BadRequestException;
import com.codex.model.User;
import com.codex.payload.SignupRequest;
import com.codex.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final Logger logger =
            LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(SignupRequest signupRequest) {

        // Null validation
        if (signupRequest == null) {

            logger.error("Signup request is null");

            throw new BadRequestException(
                    "Signup request cannot be null"
            );
        }

        // Email validation
        if (signupRequest.getEmail() == null
                || signupRequest.getEmail().isBlank()) {

            logger.error("Email is required");

            throw new BadRequestException(
                    "Email is required"
            );
        }

        // Password validation
        if (signupRequest.getPassword() == null
                || signupRequest.getPassword().isBlank()) {

            logger.error("Password is required");

            throw new BadRequestException(
                    "Password is required"
            );
        }

        // Check existing email
        if (userRepository.existsByEmail(
                signupRequest.getEmail()
        )) {

            logger.warn(
                    "Email already exists : {}",
                    signupRequest.getEmail()
            );

            throw new BadRequestException(
                    "Email already in use"
            );
        }

        // Create user
        User user = User.builder()

                .name(signupRequest.getName())

                .email(signupRequest.getEmail())

                .password(
                        passwordEncoder.encode(
                                signupRequest.getPassword()
                        )
                )

                .build();

        // Save user
        User savedUser = userRepository.save(user);

        logger.info(
                "User registered successfully : {}",
                savedUser.getEmail()
        );

        return savedUser;
    }
}