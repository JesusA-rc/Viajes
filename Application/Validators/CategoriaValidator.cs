using System;
using Application.DTOs;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Validators;

public class CategoriaValidator : AbstractValidator<CategoriaDto>
{
    private readonly ViajesContext _context;
    public CategoriaValidator(ViajesContext context)
    {

        _context = context;

        RuleFor(c => c.Nombre)
            .NotEmpty().WithMessage("El nombre de la categoría es obligatorio.")
            .MaximumLength(100).WithMessage("El nombre no puede tener más de 100 caracteres.");

        RuleFor(c => c.Descripcion)
            .NotEmpty().WithMessage("La descripción es obligatoria.")
            .MaximumLength(200).WithMessage("La descripción no puede tener más de 200 caracteres.");
    }

    public async Task<bool> CategoriaExist(int idCategoria, CancellationToken cancellationToken){
        return await _context.Categorias
            .AnyAsync(c => c.IdCategoria == idCategoria, cancellationToken);
    }


}