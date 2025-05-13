using FluentValidation;
using Application.DTOs;
using Persistence;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Application.Validators;

public class DestinoCategoriaValidator : AbstractValidator<DestinoCategoriaDTO>
{
     private readonly ViajesContext _context;

    public DestinoCategoriaValidator(ViajesContext context, DestinoValidator destinoValidator, CategoriaValidator categoriaValidator)
    {
        _context = context;

        RuleFor(dc => dc.ID_Destino)
            .NotEmpty().WithMessage("El campo ID destino no puede estar vacio")
            .MustAsync(destinoValidator.DestinoExist).WithMessage($"El id no existe")
            .GreaterThan(0).WithMessage("El ID del destino debe ser mayor que cero.");

        RuleFor(dc => dc.ID_Categoria)
            .NotEmpty().WithMessage("El campo ID categoria no puede estar vacio")
            .MustAsync(categoriaValidator.CategoriaExist).WithMessage("La categoria no existe")
            .GreaterThan(0).WithMessage("El ID de la categoría debe ser mayor que cero.");

        RuleFor(dc => dc)
            .MustAsync(RelacionNoExiste).WithMessage("El destino ya está asociado a esta categoría.");
        
    }

    private async Task<bool> RelacionNoExiste(DestinoCategoriaDTO dto, CancellationToken cancellationToken)
    {
        bool existe = await _context.DestinoCategorias
            .AnyAsync(dc => dc.ID_Destino == dto.ID_Destino && dc.ID_Categoria == dto.ID_Categoria, cancellationToken);

        return !existe;
    }

}