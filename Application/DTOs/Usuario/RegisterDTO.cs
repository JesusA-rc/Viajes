using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Usuario;

public class RegisterDTO
{
    [Required]
    public string Nombre { get; set; }
    public bool Estado { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
}