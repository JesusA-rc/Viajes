using FluentValidation;
using Application.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Application.Validators;

public class UsuarioValidator : AbstractValidator<UsuarioDto>
{
    private readonly UserManager<Usuario> _userManager;

    public UsuarioValidator(UserManager<Usuario> userManager)
    {
        _userManager = userManager;

        RuleFor(u => u.Nombre)
            .NotEmpty().WithMessage("El nombre es obligatorio")
            .MaximumLength(100).WithMessage("El nombre no puede exceder 100 caracteres");

        RuleFor(u => u.Password) 
            .NotEmpty().When(u => u.Id == 0)
            .MinimumLength(8).WithMessage("La contraseña debe tener al menos 8 caracteres")
            .Matches("[A-Z]").WithMessage("La contraseña debe contener al menos una mayúscula")
            .Matches("[a-z]").WithMessage("La contraseña debe contener al menos una minúscula")
            .Matches("[0-9]").WithMessage("La contraseña debe contener al menos un número");

    }

    private async Task<bool> EmailUnico(string email, CancellationToken ct)
    {
        var usuario = await _userManager.FindByEmailAsync(email);
        return usuario == null; 
    }

    public async Task<bool> UsuarioExist(int id, CancellationToken ct)
    {
        var usuario = await _userManager.FindByIdAsync(id.ToString());
        return usuario != null;
    }
}