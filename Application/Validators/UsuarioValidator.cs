using FluentValidation;
using Application.DTOs;

namespace Application.Validators;

public class UsuarioValidator : AbstractValidator<UsuarioDto>
{
    public UsuarioValidator()
    {
        RuleFor(u => u.Nombre).NotEmpty().WithMessage("El nombre es obligatorio");
        RuleFor(u => u.Email).NotEmpty().EmailAddress().WithMessage("El email debe ser válido");
        RuleFor(u => u.Estado).NotNull().WithMessage("El estado es obligatorio");
    }
}