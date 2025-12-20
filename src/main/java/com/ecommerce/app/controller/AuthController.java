package com.ecommerce.app.controller;

import com.ecommerce.app.dto.*;
import com.ecommerce.app.entity.User;
import com.ecommerce.app.repository.UserRepository;
import com.ecommerce.app.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;
    private final UserRepository repo;

    public AuthController(AuthService authService, UserRepository repo) {
        this.authService = authService;
        this.repo = repo;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        User u = authService.register(request);
        return new AuthResponse("Registered", u.getId(), u.getUsername(), u.getRole());
    }

    @PostMapping("/login")
    public JWTResponse login(@RequestBody LoginRequest req) {
        String token = authService.login(req);
        User user = repo.findByUsername(req.getUsername()).get();
        return new JWTResponse(
                "Login Success",
                token,
                user.getId(),
                user.getUsername(),
                user.getRole()
        );
    }
}
