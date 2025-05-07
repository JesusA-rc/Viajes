using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class FavoritosValidator : AbstractValidator<FavoritosDto>
{
    public FavoritosValidator()
    {
        RuleFor(f => f.UsuarioId)
            .GreaterThan(0).WithMessage("El ID del usuario debe ser mayor que cero.");

        RuleFor(f => f.DestinoId)
            .GreaterThan(0).WithMessage("El ID del destino debe ser mayor que cero.");
    }
}
