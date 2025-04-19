using System;
using Microsoft.EntityFrameworkCore;
using Domain.Models;

namespace Persistence;

public partial class ViajesContext : DbContext
{
    public ViajesContext()
    {
    }

    public ViajesContext(DbContextOptions<ViajesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categorias> Categorias { get; set; }

    public virtual DbSet<Destinos> Destinos { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categorias>(entity =>
        {
            entity.HasKey(e => e.IdCategoria).HasName("PK__Categori__02AA07855F2A02A4");

            entity.Property(e => e.IdCategoria).HasColumnName("ID_Categoria");
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Destinos>(entity =>
        {
            entity.HasKey(e => e.IdDestino).HasName("PK__Destinos__A7BDD3CEC2EB395E");

            entity.Property(e => e.IdDestino).HasColumnName("ID_Destino");
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.Pais).HasMaxLength(50);
            entity.Property(e => e.Region).HasMaxLength(50);

            entity.HasMany(d => d.IdCategoria).WithMany(p => p.IdDestinos)
                .UsingEntity<Dictionary<string, object>>(
                    "DestinosCategoria",
                    static r => r.HasOne<Categorias>().WithMany()
                        .HasForeignKey("IdCategoria")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DestinosC__ID_Ca__534D60F1"),
                    l => l.HasOne<Destinos>().WithMany()
                        .HasForeignKey("IdDestino")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__DestinosC__ID_De__52593CB8"),
                    j =>
                    {
                        j.HasKey("IdDestino", "IdCategoria").HasName("PK__Destinos__E79773B6D383AFD9");
                        j.ToTable("DestinosCategorias");
                        j.IndexerProperty<int>("IdDestino").HasColumnName("ID_Destino");
                        j.IndexerProperty<int>("IdCategoria").HasColumnName("ID_Categoria");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
