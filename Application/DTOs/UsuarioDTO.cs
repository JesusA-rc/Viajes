using System;
using System.Text.Json.Serialization;

namespace Application.DTOs;

public class UsuarioDto 
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    
    [JsonPropertyName("Contraseña")]
    public string Password { get; set; } 
}