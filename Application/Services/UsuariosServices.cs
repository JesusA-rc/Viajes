using System;
using Domain.Models;
using Application.DTOs;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using Application.Validators;
using Microsoft.AspNetCore.Identity;
using Application.DTOs.Usuario;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace Application.Services;

public class UsuariosServices
{
    private readonly UserManager<Usuario> _userManager;
    private readonly IMapper _mapper;
    private readonly UsuarioValidator _validator;
    private readonly IConfiguration _config;
    private readonly ViajesContext _context;

    public UsuariosServices(UserManager<Usuario> userManager, IMapper mapper, UsuarioValidator validator, IConfiguration config,
        ViajesContext context)
    {
        _userManager = userManager;
        _mapper = mapper;
        _validator = validator;
        _config = config;
        _context = context;
    }
    public async Task<Result<IEnumerable<UsuarioDto>>> GetAll()
    {
        var usuarios = _userManager.Users.ToList(); 
        if (!usuarios.Any())
        {
            return Result<IEnumerable<UsuarioDto>>.Failure("No se encontraron usuarios", 404);
        }

        var usuariosDto = _mapper.Map<IEnumerable<UsuarioDto>>(usuarios);
        return Result<IEnumerable<UsuarioDto>>.Success(usuariosDto);
    }

    public async Task<Result<UsuarioDto>> GetById(int id)
    {
        var usuario = await _userManager.FindByIdAsync(id.ToString());
        if (usuario == null)
        {
            return Result<UsuarioDto>.Failure("Usuario no encontrado", 404);
        }

        var usuarioDto = _mapper.Map<UsuarioDto>(usuario);
        return Result<UsuarioDto>.Success(usuarioDto);
    }

    public async Task<Result<UsuarioDto>> CreateUsuario(UsuarioDto usuarioDto)
    {
        try
        {
            var usuario = _mapper.Map<Usuario>(usuarioDto);

            //usuario.UserName = usuarioDto.Email; 
            usuario.FechaCreacion = DateTime.UtcNow;
            usuario.Estado = true;

            var result = await _userManager.CreateAsync(usuario, usuarioDto.Password);
            if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description);
                    return Result<UsuarioDto>.Failure(errors,400);
                }

            return Result<UsuarioDto>.Success(_mapper.Map<UsuarioDto>(usuario));
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al crear el usuario: {ex.Message}");
            return Result<UsuarioDto>.Failure("Error interno del servidor: " + ex.Message, 500);
        }
    }

    public async Task<Result<UsuarioDto>> UpdateUsuario(int id, UsuarioUpdateDTO usuarioUpdateDto)
    {
        var usuarioToUpdate = await _userManager.FindByIdAsync(id.ToString());
        if (usuarioToUpdate == null)
        {
            return Result<UsuarioDto>.Failure("Usuario no encontrado", 404);
        }

        /*
        var validationResult = await Task.FromResult(_validator.Validate(usuarioUpdateDto));
        if (!validationResult.IsValid)
        {
            var errors = string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage));
            return Result<UsuarioDto>.Failure($"Errores de validación: {errors}", 400);
        }
        */

        usuarioToUpdate.Nombre = usuarioUpdateDto.Nombre;
        usuarioToUpdate.Email = usuarioUpdateDto.Email;
        usuarioToUpdate.UserName = usuarioUpdateDto.Email; 
        usuarioToUpdate.Estado = usuarioUpdateDto.Estado;

        var result = await _userManager.UpdateAsync(usuarioToUpdate);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return Result<UsuarioDto>.Failure($"Error al actualizar: {errors}", 400);
        }

        return Result<UsuarioDto>.Success(_mapper.Map<UsuarioDto>(usuarioToUpdate));
    }

    public async Task<Result<bool>> DeleteUsuario(int id)
    {
        var usuarioToDelete = await _userManager.FindByIdAsync(id.ToString());
        if (usuarioToDelete == null)
        {
            return Result<bool>.Failure("Usuario no encontrado", 404);
        }

        var result = await _userManager.DeleteAsync(usuarioToDelete);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return Result<bool>.Failure($"Error al eliminar: {errors}", 400);
        }

        return Result<bool>.Success(true);
    }

    public async Task<Result<AuthResponseDTO>> Login(string email, string password)
    {
        try
        {
            var usuario = await _userManager.FindByEmailAsync(email);
            if (usuario == null)
            {
                return Result<AuthResponseDTO>.Failure("Credenciales inválidas", 401);
            }

            var isValidPassword = await _userManager.CheckPasswordAsync(usuario, password);
            if (!isValidPassword)
            {
                return Result<AuthResponseDTO>.Failure("Credenciales inválidas", 401);
            }

            var token = GenerateJwtToken(usuario);

            var authResponse = new AuthResponseDTO
            {
                IsAuthenticated = true,
                UserId = Convert.ToInt32(usuario.Id),
                Email = usuario.Email,
                Token = token 
            };

            return Result<AuthResponseDTO>.Success(authResponse);
        }
        catch (Exception ex)
        {
            return Result<AuthResponseDTO>.Failure($"Error inesperado: {ex.Message}", 500);
        }
    }


    
    
    private string GenerateJwtToken(Usuario usuario)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
            new Claim(ClaimTypes.Email, usuario.Email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<Result<IEnumerable<DestinoDto>>> GetFavoritosByUsuarioId(int
    usuarioId)
    {
        try
        {
            var usuario = await _userManager.FindByIdAsync(usuarioId.ToString());
            if (usuario == null)
            {
                return Result<IEnumerable<DestinoDto>>.Failure("Usuario no encontrado", 404);
            }

            var destinosFavoritos = await _context.Favoritos
                .Where(f => f.UsuarioId == usuarioId)
                .Select(f => f.Destino)
                .ToListAsync();

            if (destinosFavoritos == null || destinosFavoritos.Count == 0)
            {
                return Result<IEnumerable<DestinoDto>>.Failure("El usuario no tiene destinos favoritos", 404);
            }

            var destinosDto = _mapper.Map<IEnumerable<DestinoDto>>(destinosFavoritos);

            return Result<IEnumerable<DestinoDto>>.Success(destinosDto);
        }
        catch (Exception ex)
        {
            return Result<IEnumerable<DestinoDto>>.Failure($"Error inesperado: {ex.Message}", 500);
        }
    }

}