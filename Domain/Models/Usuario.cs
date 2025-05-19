using Microsoft.AspNetCore.Identity;

namespace Domain.Models;

public class Usuario : IdentityUser<int>
{
    public string Nombre { get; set; }
    public DateTime FechaCreacion { get; set; }
    public bool Estado { get; set; }

    public string? FotoPerfil { get; set; }
    public string? Banner { get; set; }

    public virtual ICollection<Favoritos> Favoritos { get; set; }
    public ICollection<UsuarioFoto> FotosAdicionales { get; set; } = [];
}
