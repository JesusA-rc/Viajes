
using Application.DTOs;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Validators;

public class DestinoValidator : AbstractValidator<DestinoDto>
{
    private readonly ViajesContext _context;
    
    public DestinoValidator(ViajesContext context)
    {

        _context = context;
        
        RuleFor(d => d.Nombre)
            .NotEmpty().WithMessage("El nombre del destino es obligatorio.")
            .MaximumLength(20).WithMessage("El nombre no puede tener más de 20 caracteres.");

        RuleFor(d => d.Descripcion)
            .NotEmpty().WithMessage("La descripcion es obligatoria.")
            .MaximumLength(100).WithMessage("La descripción no puede tener más de 100 caracteres.");

        RuleFor(d => d.Pais)
            .NotEmpty().WithMessage("El país es obligatorio.")
            .MaximumLength(20).WithMessage("El país no puede tener más de 20 caracteres.");


        RuleFor(d => d.Region)
            .NotEmpty().WithMessage("La region es obligatorio")
            .MaximumLength(100).WithMessage("La región no puede tener más de 100 caracteres.");
    }

    public async Task<bool> DestinoExist(int destinoId, CancellationToken cancellationToken)
    {
        return await _context.Destinos
            .AnyAsync(d => d.IdDestino == destinoId, cancellationToken);
    }

}