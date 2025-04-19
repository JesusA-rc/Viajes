using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Models;

public partial class Destinos
{
    public int IdDestino { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public string? Imagen { get; set; }

    public string Pais { get; set; } = null!;

    public string? Region { get; set; }
    [JsonIgnore]
    public virtual ICollection<Categorias> IdCategoria { get; set; } = new List<Categorias>();
}
