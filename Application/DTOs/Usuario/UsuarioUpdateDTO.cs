using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Usuario;

public class UsuarioUpdateDTO
{
    [Required]
    public string Nombre { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    public bool Estado { get; set; }
}