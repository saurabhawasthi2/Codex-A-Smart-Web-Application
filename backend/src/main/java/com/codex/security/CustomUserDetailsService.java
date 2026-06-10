package com.codex.security;

import com.codex.model.User;
import com.codex.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(
            String email
    ) throws UsernameNotFoundException {

        User user =
                userRepository.findByEmail(email)

                        .orElseThrow(() ->
                                new UsernameNotFoundException(
                                        "User not found : "
                                                + email
                                )
                        );

        return new org.springframework.security.core.userdetails.User(

                user.getEmail(),

                user.getPassword(),

                new ArrayList<>()
        );
    }
}