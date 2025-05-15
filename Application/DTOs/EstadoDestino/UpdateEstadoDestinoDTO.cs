using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.EstadoDestino;

public class UpdateEstadoDestinoDTO
{
    [Required(ErrorMessage = "El estado es requerido")]
    public string Estado { get; set; }
}