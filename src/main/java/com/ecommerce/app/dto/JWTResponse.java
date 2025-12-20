package com.ecommerce.app.dto;

public class JWTResponse {
    private String message;
    private String token;
    private Long userId;
    private String username;
    private String role;

    public JWTResponse(String message, String token, Long userId, String username, String role) {
        this.message = message;
        this.token = token;
        this.userId = userId;
        this.username = username;
        this.role = role;
    }

    public String getMessage() { return message; }
    public String getToken() { return token; }
    public Long getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getRole() { return role; }
}
