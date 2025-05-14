using System;
using Domain.Models;
using Application.DTOs;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using Application.Validators;
using FluentValidation;
using Application;

namespace Application.Services;

public class DestinosServices
{
    private readonly ViajesContext _context;
    private readonly IMapper _mapper;
    private readonly DestinoValidator _validator;

    public DestinosServices(ViajesContext context, IMapper mapper, DestinoValidator validator)
    {
        _context = context;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Result<IEnumerable<DestinoDto>>> GetAll()
    {
        var destinos = await _context.Destinos
            .Include(d => d.DestinoCategoria)  // Asegúrate que este es el nombre correcto de la propiedad
                .ThenInclude(dc => dc.Categoria)
            .ToListAsync();

        if (!destinos.Any())
        {
            return Result<IEnumerable<DestinoDto>>.Failure("No se encontraron destinos", 404);
        }

        var destinosDto = destinos.Select(d => new DestinoDto
        {
            IdDestino = d.IdDestino,
            Nombre = d.Nombre,
            Descripcion = d.Descripcion,
            Imagen = d.Imagen,
            Pais = d.Pais,
            Region = d.Region,
            Categorias = d.DestinoCategoria
                .Select(dc => new CategoriaDto 
                {
                    IdCategoria = dc.Categoria.IdCategoria,
                    Nombre = dc.Categoria.Nombre,
                    Descripcion = dc.Categoria.Descripcion
                })
                .ToList()
        });

        return Result<IEnumerable<DestinoDto>>.Success(destinosDto);
    }

    public async Task<Result<DestinoDto>> GetById(int id)
    {
        var destino = await _context.Destinos.FindAsync(id);
        if (destino == null)
        {
            return Result<DestinoDto>.Failure("Destino no encontrado", 404);
        }

        var destinoDto = _mapper.Map<DestinoDto>(destino);
        return Result<DestinoDto>.Success(destinoDto);
    }


    public async Task<Result<bool>> DeleteDestino(int id)
    {
        var destino = await _context.Destinos.FindAsync(id);
        if (destino == null)
        {
            return Result<bool>.Failure("Destino no encontrado", 404);
        }

        _context.Destinos.Remove(destino);
        await _context.SaveChangesAsync();
        return Result<bool>.Success(true);
    }

    public async Task<Result<DestinoDto>> CreateDestino(Destinos destino)
    {
        var destinoDto = _mapper.Map<DestinoDto>(destino);

        var validationResult = await Task.FromResult(_validator.Validate(destinoDto));
        if (!validationResult.IsValid)
        {
            var errors = string.Join(", ", validationResult.Errors);
            return Result<DestinoDto>.Failure($"Errores de validación: {errors}", 400);
        }

        _context.Destinos.Add(destino);
        await _context.SaveChangesAsync();
        return Result<DestinoDto>.Success(_mapper.Map<DestinoDto>(destino));
    }

    public async Task<Result<DestinoDto>> UpdateDestino(int id, Destinos destino)
    {
        var destinoToUpdate = await _context.Destinos.FindAsync(id);
        if (destinoToUpdate == null)
        {
            return Result<DestinoDto>.Failure("Destino no encontrado", 404);
        }

        var destinoDto = _mapper.Map<DestinoDto>(destino);

        var validationResult = await Task.FromResult(_validator.Validate(destinoDto));
        if (!validationResult.IsValid)
        {
            var errors = string.Join(", ", validationResult.Errors);
            return Result<DestinoDto>.Failure($"Errores de validación: {errors}", 400);
        }

        destinoToUpdate.Nombre = destino.Nombre;
        destinoToUpdate.Descripcion = destino.Descripcion;
        destinoToUpdate.Imagen = destino.Imagen;
        destinoToUpdate.Region = destino.Region;
        await _context.SaveChangesAsync();

        return Result<DestinoDto>.Success(_mapper.Map<DestinoDto>(destinoToUpdate));
    }
}