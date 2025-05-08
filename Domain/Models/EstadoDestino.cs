using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

public class EstadoDestino
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UsuarioId { get; set; }

    [Required]
    public int DestinoId { get; set; }

    [Required, MaxLength(50)]
    public string Estado { get; set; } 

    [ForeignKey("UsuarioId")]
    public Usuario Usuario { get; set; }

    [ForeignKey("DestinoId")]
    public Destinos Destino { get; set; }
}