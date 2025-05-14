using System;

namespace Application.DTOs;

public class DestinoDto
{
    public int IdDestino { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public string? Imagen { get; set; }

    public string Pais { get; set; } = null!;

    public string? Region { get; set; }

    public List<CategoriaDto> Categorias { get; set; } = new List<CategoriaDto>();

}