using System.Text.Json.Serialization;
using Domain.Models;

public class UsuarioFoto
{
    public int Id { get; set; }
    public required string Url { get; set; }

    public required int UsuarioId { get; set; }
    public required string? PublicId { get; set; }
    [JsonIgnore]
    public Usuario Usuario { get; set; } 
}