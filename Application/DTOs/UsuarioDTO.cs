using System;

namespace Application.DTOs;

public class UsuarioDto
{
    public int Id { get; set; }

    public string Nombre { get; set; }

    public string Email { get; set; }
    public string Contraseña { get; set; }

    public bool Estado { get; set; }
}
