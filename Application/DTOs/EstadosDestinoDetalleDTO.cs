
namespace Application.DTOs;

public class EstadosDestinoDetalleDTO
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public string UsuarioNombre { get; set; } 
    public int DestinoId { get; set; }
    public DestinoDto Destino { get; set; }  
    public string Estado { get; set; }
}