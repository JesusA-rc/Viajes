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

public class CategoriasServices
{
    private readonly ViajesContext _context;
    private readonly IMapper _mapper;
    private readonly CategoriaValidator _validator;

    public CategoriasServices(ViajesContext context, IMapper mapper, CategoriaValidator validator)
    {
        _context = context;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Result<IEnumerable<CategoriaDto>>> GetAll()
    {
        var categorias = await _context.Categorias.ToListAsync();
        if (categorias == null || categorias.Count == 0)
        {
            return Result<IEnumerable<CategoriaDto>>.Failure("No se encontraron categorías", 404);
        }

        var categoriasDto = _mapper.Map<IEnumerable<CategoriaDto>>(categorias);
        return Result<IEnumerable<CategoriaDto>>.Success(categoriasDto);
    }

    public async Task<Result<CategoriaDto>> GetById(int id)
    {
        var categoria = await _context.Categorias.FindAsync(id);
        if (categoria == null)
        {
            return Result<CategoriaDto>.Failure("Categoría no encontrada", 404);
        }

        var categoriaDto = _mapper.Map<CategoriaDto>(categoria);
        return Result<CategoriaDto>.Success(categoriaDto);
    }

    public async Task<Result<bool>> DeleteCategoria(int id)
    {
        var categoriaToDelete = await _context.Categorias.FindAsync(id);
        if (categoriaToDelete == null)
        {
            return Result<bool>.Failure("Categoría no encontrada", 404);
        }

        _context.Categorias.Remove(categoriaToDelete);
        await _context.SaveChangesAsync();
        return Result<bool>.Success(true);
    }

    public async Task<Result<CategoriaDto>> CreateCategoria(Categorias categoria)
    {
        var categoriaDto = _mapper.Map<CategoriaDto>(categoria);

        var validationResult = await Task.FromResult(_validator.Validate(categoriaDto));
        if (!validationResult.IsValid)
        {
            var errors = string.Join(", ", validationResult.Errors);
            return Result<CategoriaDto>.Failure($"Errores de validación: {errors}", 400);
        }

        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();
        return Result<CategoriaDto>.Success(_mapper.Map<CategoriaDto>(categoria));
    }

    public async Task<Result<CategoriaDto>> UpdateCategoria(int id, Categorias categoria)
    {
        var categoriaToUpdate = await _context.Categorias.FindAsync(id);
        if (categoriaToUpdate == null)
        {
            return Result<CategoriaDto>.Failure("Categoría no encontrada", 404);
        }

        var categoriaDto = _mapper.Map<CategoriaDto>(categoria);

        var validationResult = await Task.FromResult(_validator.Validate(categoriaDto));
        if (!validationResult.IsValid)
        {
            var errors = string.Join(", ", validationResult.Errors);
            return Result<CategoriaDto>.Failure($"Errores de validación: {errors}", 400);
        }

        categoriaToUpdate.Nombre = categoria.Nombre;
        categoriaToUpdate.Descripcion = categoria.Descripcion;
        await _context.SaveChangesAsync();

        return Result<CategoriaDto>.Success(_mapper.Map<CategoriaDto>(categoriaToUpdate));
    }
}