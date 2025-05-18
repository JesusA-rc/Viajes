namespace Application.DTOs.Usuario;

public class AuthResponseDTO
{
    public bool IsAuthenticated { get; set; }
    public int UserId { get; set; }
    public string Email { get; set; }
    public string Token { get; set; } 
}