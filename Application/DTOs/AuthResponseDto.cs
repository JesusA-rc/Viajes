namespace Application.DTOs;

public class AuthResponseDto
{
    public bool IsAuthenticated { get; set; }
    public int UserId { get; set; } 
    public string Email { get; set; }
}