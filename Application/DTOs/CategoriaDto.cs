using System;

namespace Application.DTOs;

public class CategoriaDto(){
    public int IdCategoria { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = "";
}