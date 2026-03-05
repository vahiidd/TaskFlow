namespace TaskFlow.Api.Dtos;

public record RegisterRequest(string Email, string FullName, string Password);
public record LoginRequest(string Email, string Password);
public record AuthResponse(int UserId, string Email, string FullName, string Token);