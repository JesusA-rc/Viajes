using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; }

        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public byte[] ContrasenaHash { get; set; }

        [Required]
        public byte[] ContrasenaSalt { get; set; }

        public DateTime FechaCreacion { get; set; }

        public bool Estado { get; set; }
    }
}