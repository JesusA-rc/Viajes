using System;
using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class CategoriaValidator : AbstractValidator<CategoriaDto>
{
    public CategoriaValidator()
    {

        RuleFor(c => c.Nombre)
            .NotEmpty().WithMessage("El nombre de la categoría es obligatorio.")
            .MaximumLength(20).WithMessage("El nombre no puede tener más de 20 caracteres.");

        RuleFor(c => c.Descripcion)
            .NotEmpty().WithMessage("La descripción es obligatoria.")
            .MaximumLength(100).WithMessage("La descripción no puede tener más de 100 caracteres.");
    }
}