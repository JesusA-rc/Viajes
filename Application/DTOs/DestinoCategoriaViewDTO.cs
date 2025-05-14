namespace Application.DTOs;

public class DestinoCategoriaViewDTO : DestinoCategoriaDTO
{
    public string NombreCategoria { get; set; }
    public string NombreDestino { get; set; }
    public string ImagenDestino { get; set; }

    public DestinoDto Destino { get; set; } 
}