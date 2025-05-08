using System;
using Domain.Models;
using Application.DTOs;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using Application.Validators;

namespace Application.Services;

public class UsuariosServices
{
    private readonly ViajesContext _context;
    private readonly IMapper _mapper;
    private readonly UsuarioValidator _validator;

    public UsuariosServices(ViajesContext context, IMapper mapper, UsuarioValidator validator)
    {
        _context = context;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Result<IEnumerable<UsuarioDto>>> GetAll()
    {
        var usuarios = await _context.Usuarios.ToListAsync();
        if (usuarios == null || usuarios.Count == 0)
        {
            return Result<IEnumerable<UsuarioDto>>.Failure("No se encontraron usuarios", 404);
        }

        var usuariosDto = _mapper.Map<IEnumerable<UsuarioDto>>(usuarios);
        return Result<IEnumerable<UsuarioDto>>.Success(usuariosDto);
    }
    public async Task<Result<UsuarioDto>> GetById(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
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

            var validationResult = await Task.FromResult(_validator.Validate(usuarioDto));
            if (!validationResult.IsValid)
            {
                var errors = string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage));
                return Result<UsuarioDto>.Failure($"Errores de validación: {errors}", 400);
            }

            var usuario = _mapper.Map<Usuario>(usuarioDto);

            var salt = GenerateSalt();
            usuario.ContrasenaHash = HashPassword(usuarioDto.Contraseña, salt);
            usuario.ContrasenaSalt = salt;
            usuario.FechaCreacion = DateTime.Now;
            usuario.Estado = true;


            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Result<UsuarioDto>.Success(_mapper.Map<UsuarioDto>(usuario));
        }
        catch (Exception ex)
        {

            Console.WriteLine($"Error al crear el usuario: {ex.Message}");
            Console.WriteLine($"Stack Trace: {ex.StackTrace}");

            return Result<UsuarioDto>.Failure("Error interno del servidor: " + ex.Message, 500);
        }
    }

    public async Task<Result<UsuarioDto>> UpdateUsuario(int id, Usuario usuario)
    {
        var usuarioToUpdate = await _context.Usuarios.FindAsync(id);
        if (usuarioToUpdate == null)
        {
            return Result<UsuarioDto>.Failure("Usuario no encontrado", 404);
        }

        var usuarioDto = _mapper.Map<UsuarioDto>(usuario);
        var validationResult = await Task.FromResult(_validator.Validate(usuarioDto));
        if (!validationResult.IsValid)
        {
            var errors = string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage));
            return Result<UsuarioDto>.Failure($"Errores de validación: {errors}", 400);
        }

        usuarioToUpdate.Nombre = usuario.Nombre;
        usuarioToUpdate.Email = usuario.Email;
        usuarioToUpdate.Estado = usuario.Estado;

        await _context.SaveChangesAsync();

        return Result<UsuarioDto>.Success(_mapper.Map<UsuarioDto>(usuarioToUpdate));
    }

    public async Task<Result<bool>> DeleteUsuario(int id)
    {
        var usuarioToDelete = await _context.Usuarios.FindAsync(id);
        if (usuarioToDelete == null)
        {
            return Result<bool>.Failure("Usuario no encontrado", 404);
        }

        _context.Usuarios.Remove(usuarioToDelete);
        await _context.SaveChangesAsync();

        return Result<bool>.Success(true);
    }

    public async Task<Result<AuthResponseDto>> Login(string email, string password)
    {
        try
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

            if (usuario == null)
            {
                return Result<AuthResponseDto>.Failure("Correo electrónico o contraseña incorrectos", 401);
            }

            var hashedPassword = HashPassword(password, usuario.ContrasenaSalt);
            if (!hashedPassword.SequenceEqual(usuario.ContrasenaHash))
            {
                return Result<AuthResponseDto>.Failure("Correo electrónico o contraseña incorrectos", 401);
            }

            var authResponse = new AuthResponseDto
            {
                IsAuthenticated = true,
                UserId = usuario.Id, 
                Email = usuario.Email 
            };

            return Result<AuthResponseDto>.Success(authResponse);
        }
        catch (Exception ex)
        {
            return Result<AuthResponseDto>.Failure($"Error inesperado: {ex.Message}", 500);
        }
    }

    private static byte[] GenerateSalt()
    {
        var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
        var salt = new byte[16];
        rng.GetBytes(salt);
        return salt;
    }

    private static byte[] HashPassword(string password, byte[] salt)
    {
        using (var hmac = new System.Security.Cryptography.HMACSHA512(salt))
        {
            return hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    public async Task<Result<IEnumerable<DestinoDto>>> GetFavoritosByUsuarioId(int usuarioId)
    {
        try
        {

            var usuario = await _context.Usuarios.FindAsync(usuarioId);
            if (usuario == null)
            {
                return Result<IEnumerable<DestinoDto>>.Failure("Usuario no encontrado", 404);
            }

            var favoritos = await _context.Favoritos
                .Where(f => f.UsuarioId == usuarioId)
                .Select(f => f.Destino) 
                .ToListAsync();

            if (favoritos == null || favoritos.Count == 0)
            {
                return Result<IEnumerable<DestinoDto>>.Failure("El usuario no tiene destinos favoritos", 404);
            }

            var destinosDto = _mapper.Map<IEnumerable<DestinoDto>>(favoritos);

            return Result<IEnumerable<DestinoDto>>.Success(destinosDto);
        }
        catch (Exception ex)
        {
            return Result<IEnumerable<DestinoDto>>.Failure($"Error inesperado: {ex.Message}", 500);
        }
    }

}