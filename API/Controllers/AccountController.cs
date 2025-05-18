using System.Text.Json;
using Application.DTOs.Usuario;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(SignInManager<Usuario> signInManager) : BaseApiController
{

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser([FromBody] RegisterDTO registerDTO)
    {
        var user = new Usuario
        {
            UserName = registerDTO.Email,
            Email = registerDTO.Email,
            Nombre = registerDTO.Nombre,
            Estado = registerDTO.Estado
        };

        var result = await signInManager.UserManager.CreateAsync(user, registerDTO.Password);

        if (!result.Succeeded)
        {
            var errores = result.Errors.Select(error =>
            {
                return error.Code switch
                {
                    "DuplicateEmail" => "Correo ya registrado",
                    "PasswordRequiresUpper" => "La contraseña debe tener al menos una letra mayúscula",
                    "PasswordRequiresLower" => "La contraseña debe tener al menos una letra minúscula",
                    "PasswordRequiresDigit" => "La contraseña debe contener al menos un número",
                    "PasswordRequiresNonAlphanumeric" => "La contraseña debe contener al menos un carácter especial",
                    "PasswordTooShort" => "La contraseña debe tener al menos 6 caracteres",
                    _ => error.Description 
                };
            }).ToList();

            return BadRequest(errores);
        }

        return Ok();
    }

    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity.IsAuthenticated == false) return NoContent();

        var user = await signInManager.UserManager.GetUserAsync(User);

        if (user == null) return Unauthorized();

        return Ok(new
        {
            user.Nombre,
            user.Email,
            user.Id,
            user.Estado
        });
    }
    
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }
    


}

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}