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

    public async Task<Result<UsuarioDto>> CreateUsuario(Usuario usuario)
    {
        var usuarioDto = _mapper.Map<UsuarioDto>(usuario);
        var validationResult = await Task.FromResult(_validator.Validate(usuarioDto));
        if (!validationResult.IsValid)
        {
            var errors = string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage));
            return Result<UsuarioDto>.Failure($"Errores de validación: {errors}", 400);
        }

        var salt = GenerateSalt();
        usuario.ContrasenaHash = HashPassword(usuario.ContrasenaSalt.ToString(), salt);
        usuario.ContrasenaSalt = salt;
        usuario.FechaCreacion = DateTime.Now;
        usuario.Estado = true;

        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return Result<UsuarioDto>.Success(_mapper.Map<UsuarioDto>(usuario));
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
}