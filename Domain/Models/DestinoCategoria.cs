namespace Domain.Models;

public class DestinoCategoria
{
    public int ID_Destino { get; set; }
    public int ID_Categoria { get; set; }

    public Destinos Destino { get; set; } 
    public Categorias Categoria { get; set; }  
}