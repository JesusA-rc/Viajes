using System.ComponentModel.DataAnnotations;

namespace Application.DTOs;

public class FavoritosDto
{
    [Required(ErrorMessage = "El ID del usuario es obligatorio.")]
    public int UsuarioId { get; set; }

    [Required(ErrorMessage = "El ID del destino es obligatorio.")]
    public int DestinoId { get; set; }


    public DestinoDto? Destino { get; set; }
}
