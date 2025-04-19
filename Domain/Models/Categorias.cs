using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Models;

public partial class Categorias
{
    public int IdCategoria { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }
    [JsonIgnore]
    public virtual ICollection<Destinos> IdDestinos { get; set; } = new List<Destinos>();
}
