package com.codex.controller;

import com.codex.model.User;
import com.codex.payload.ApiResponse;
import com.codex.payload.JwtAuthResponse;
import com.codex.payload.LoginRequest;
import com.codex.payload.SignupRequest;
import com.codex.repository.UserRepository;
import com.codex.security.JwtTokenProvider;
import com.codex.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final UserService userService;

    private final JwtTokenProvider tokenProvider;

    public AuthController(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            UserService userService,
            JwtTokenProvider tokenProvider
    ) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(
            @Valid @RequestBody LoginRequest loginRequest
    ) {

        Authentication authentication =
                authenticationManager.authenticate(

                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getEmail(),
                                loginRequest.getPassword()
                        )
                );

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        String jwt =
                tokenProvider.generateToken(authentication);

        User user =
                userRepository.findByEmail(
                        loginRequest.getEmail()
                ).orElseThrow();

        JwtAuthResponse.UserDto userDto =
                new JwtAuthResponse.UserDto(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                );

        return ResponseEntity.ok(

                new ApiResponse<>(
                        true,
                        "User logged in successfully",

                        new JwtAuthResponse(
                                jwt,
                                "Bearer",
                                userDto
                        )
                )
        );
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(
            @Valid @RequestBody SignupRequest signupRequest
        ) 
    {

        User result =
                userService.registerUser(signupRequest);

        Authentication authentication =
                authenticationManager.authenticate(

                        new UsernamePasswordAuthenticationToken(
                                signupRequest.getEmail(),
                                signupRequest.getPassword()
                        )
                );

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        String jwt =
                tokenProvider.generateToken(authentication);

        JwtAuthResponse.UserDto userDto =
                new JwtAuthResponse.UserDto(
                        result.getId(),
                        result.getName(),
                        result.getEmail()
                );
                System.out.println("Signup API Hit");

        return ResponseEntity.status(HttpStatus.CREATED)

                .body(

                        new ApiResponse<>(
                                true,
                                "User registered successfully",

                                new JwtAuthResponse(
                                        jwt,
                                        "Bearer",
                                        userDto
                                )
                        )
                );
    }
}