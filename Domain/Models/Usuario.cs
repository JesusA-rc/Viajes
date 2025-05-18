using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

public class Usuario : IdentityUser<int>  
{
    public string Nombre { get; set; }
    public DateTime FechaCreacion { get; set; }
    public bool Estado { get; set; }

    public virtual ICollection<Favoritos> Favoritos { get; set; }
}
