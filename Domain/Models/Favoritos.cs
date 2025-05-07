using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class Favoritos
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Usuario")]
        public int UsuarioId { get; set; }

        [ForeignKey("Destino")]
        public int DestinoId { get; set; }

        public virtual Usuario Usuario { get; set; }
        public virtual Destinos Destino { get; set; }
    }
}