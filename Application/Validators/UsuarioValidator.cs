using FluentValidation;
using Application.DTOs;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Validators;

public class UsuarioValidator : AbstractValidator<UsuarioDto>
{
    private readonly ViajesContext _context;
    public UsuarioValidator(ViajesContext context)
    {
        _context = context;

        RuleFor(u => u.Nombre).NotEmpty().WithMessage("El nombre es obligatorio");
        RuleFor(u => u.Email).NotEmpty().EmailAddress().WithMessage("El email debe ser válido");
        RuleFor(u => u.Estado).NotNull().WithMessage("El estado es obligatorio");
        RuleFor(ed => ed.Id)
            .GreaterThan(0).WithMessage("El ID del usuario debe ser mayor que cero.")
            .WithMessage((dto, Id) => $"El destino con ID {Id} no existe");
    }

    public async Task<bool> UsuarioExist(int usuarioId, CancellationToken cancellationToken)
    {
        return await _context.Usuarios
            .AnyAsync(u => u.Id == usuarioId, cancellationToken);
    }
}