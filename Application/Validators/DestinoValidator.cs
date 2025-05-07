
using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class DestinoValidator : AbstractValidator<DestinoDto>
{
    public DestinoValidator()
    {
        RuleFor(d => d.Nombre)
            .NotEmpty().WithMessage("El nombre del destino es obligatorio.")
            .MaximumLength(20).WithMessage("El nombre no puede tener más de 20 caracteres.");

        RuleFor(d => d.Descripcion)
            .NotEmpty().WithMessage("La descripcion es obligatoria.")
            .MaximumLength(100).WithMessage("La descripción no puede tener más de 100 caracteres.");

        /*
        RuleFor(d => d.Imagen)
            .Matches(@"^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$")
            .WithMessage("La URL de la imagen no es válida.")
            .When(d => !string.IsNullOrEmpty(d.Imagen)); 
        */

        RuleFor(d => d.Pais)
            .NotEmpty().WithMessage("El país es obligatorio.")
            .MaximumLength(20).WithMessage("El país no puede tener más de 20 caracteres.");


        RuleFor(d => d.Region)
            .NotEmpty().WithMessage("La region es obligatorio")
            .MaximumLength(100).WithMessage("La región no puede tener más de 100 caracteres.");
    }
}