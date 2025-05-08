using FluentValidation;
using Application.DTOs;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Validators;

namespace Application.Validators;

public class EstadoDestinoValidator : AbstractValidator<EstadosDestinoDTO>
{
    private readonly ViajesContext _context;
    
    public EstadoDestinoValidator(ViajesContext context, DestinoValidator destinoValidator, UsuarioValidator usuarioValidator)
    {
        _context = context;

        RuleFor(ed => ed.UsuarioId)
            .GreaterThan(0).WithMessage("El ID del usuario debe ser mayor que cero.");

        RuleFor(ed => ed.DestinoId)
            .GreaterThan(0).WithMessage("El ID del destino debe ser mayor que cero.");

        RuleFor(ed => ed.Estado)
            .NotEmpty().WithMessage("El estado es obligatorio.")
            .Must(BeAValidEstado).WithMessage("El estado proporcionado no es valido");

       RuleFor(ed => ed)
            .MustAsync(BeUniqueUsuarioDestinoUsuario)
            .WithMessage("Este usuario ya tiene registrado este destino.");

        RuleFor(ed => ed.DestinoId)
            .GreaterThan(0).WithMessage("El ID del destino debe ser mayor que cero.")
            .MustAsync(destinoValidator.DestinoExist)
            .WithMessage((dto, destinoId) => $"El destino con ID {destinoId} no existe");

        RuleFor(ed => ed.UsuarioId)
            .MustAsync(usuarioValidator.UsuarioExist)
            .WithMessage((dto, destinoId) => $"El destino con ID {destinoId} no existe");

    }

    private async Task<bool> BeUniqueUsuarioDestinoUsuario(EstadosDestinoDTO dto, CancellationToken cancellationToken)
    {
        return !await _context.EstadoDestino
            .AnyAsync(ed => ed.UsuarioId == dto.UsuarioId && 
                 ed.DestinoId == dto.DestinoId && (dto.Id == 0 || ed.Id != dto.Id), cancellationToken);
    }

    private bool BeAValidEstado(string estado)
    {
        var estadosPermitidos = new[] { "Visitados", "Planeados", "No volveria a ir" };
        return estadosPermitidos.Contains(estado);
    }
}