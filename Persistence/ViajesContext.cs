using System;
using Microsoft.EntityFrameworkCore;
using Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public partial class ViajesContext :  IdentityDbContext<Usuario, IdentityRole<int>, int>
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

    public virtual DbSet<Favoritos> Favoritos { get; set; }

    public DbSet<EstadoDestino> EstadoDestino { get; set; }
    
    public DbSet<DestinoCategoria> DestinoCategorias { get; set; }
    
    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Usuario>(b => b.ToTable("Usuarios"));
        modelBuilder.Entity<IdentityUserClaim<int>>(b => b.ToTable("UsuarioClaims"));
        modelBuilder.Entity<IdentityUserLogin<int>>(b => b.ToTable("UsuarioLogins"));
        modelBuilder.Entity<IdentityUserToken<int>>(b => b.ToTable("UsuarioTokens"));
        modelBuilder.Entity<IdentityRole<int>>(b => b.ToTable("Roles"));
        modelBuilder.Entity<IdentityRoleClaim<int>>(b => b.ToTable("RoleClaims"));
        modelBuilder.Entity<IdentityUserRole<int>>(b => b.ToTable("UsuarioRoles"));

        modelBuilder.Entity<Usuario>(b =>
        {
            b.Property(u => u.FechaCreacion).HasDefaultValueSql("GETDATE()");
            b.Property(e => e.Estado).HasDefaultValue(true);
        });

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
                        j.IndexerProperty<int>("IdDestino").HasColumnName("ID_Destino");
                        j.IndexerProperty<int>("IdCategoria").HasColumnName("ID_Categoria");
                    });
        });

        modelBuilder.Entity<Favoritos>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Favoritos");

            entity.HasOne(f => f.Usuario)
                .WithMany(u => u.Favoritos)
                .HasForeignKey(f => f.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Favoritos_Usuarios");

            entity.HasOne(f => f.Destino)
                .WithMany(d => d.Favoritos)
                .HasForeignKey(f => f.DestinoId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Favoritos_Destinos");
        });

        modelBuilder.Entity<EstadoDestino>()
            .HasOne(ed => ed.Usuario)
            .WithMany()
            .HasForeignKey(ed => ed.UsuarioId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<EstadoDestino>()
            .HasOne(ed => ed.Destino)
            .WithMany()
            .HasForeignKey(ed => ed.DestinoId)
            .OnDelete(DeleteBehavior.Restrict);


        // Configuración de la tabla Destino_Categoria
        modelBuilder.Entity<DestinoCategoria>()
            .HasKey(dc => new { dc.ID_Destino, dc.ID_Categoria });

        modelBuilder.Entity<DestinoCategoria>()
            .ToTable("Destino_Categoria");

        // Configuración de las relaciones de la tabla Destino_Categoria
        modelBuilder.Entity<DestinoCategoria>()
            .HasOne(dc => dc.Destino)
            .WithMany(d => d.DestinoCategoria)
            .HasForeignKey(dc => dc.ID_Destino);

        modelBuilder.Entity<DestinoCategoria>()
            .HasOne(dc => dc.Categoria)
            .WithMany(c => c.DestinoCategoria)
            .HasForeignKey(dc => dc.ID_Categoria);

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
