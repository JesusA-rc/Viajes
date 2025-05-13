using Domain.Models;
using Application.DTOs;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using Application.Validators;

namespace Application.Services;

public class DestinoCategoriaService
{
    private readonly ViajesContext _context;
    private readonly IMapper _mapper;
    private readonly DestinoCategoriaValidator _validator;

    public DestinoCategoriaService(ViajesContext context, IMapper mapper, DestinoCategoriaValidator validator)
    {
        _context = context;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Result<IEnumerable<DestinoCategoriaDTO>>> GetAll()
    {
        var relaciones = await _context.DestinoCategorias
            .Include(dc => dc.Destino)
            .Include(dc => dc.Categoria)
            .ToListAsync();

        if (relaciones == null || relaciones.Count == 0)
        {
            return Result<IEnumerable<DestinoCategoriaDTO>>.Failure("No se encontraron relaciones", 404);
        }

        var relacionesDto = _mapper.Map<IEnumerable<DestinoCategoriaDTO>>(relaciones);
        return Result<IEnumerable<DestinoCategoriaDTO>>.Success(relacionesDto);
    }
    //Todas las categorias que tiene un destino
    public async Task<Result<IEnumerable<DestinoCategoriaDTO>>> GetAllByDestino(int idDestino){

        var relacion = await _context.DestinoCategorias
            .Include(dc => dc.Destino)
            .Include(dc => dc.Categoria)
            .Where(dc => dc.ID_Destino == idDestino)
            .ToListAsync();

        var relacionDto = _mapper.Map<IEnumerable<DestinoCategoriaDTO>>(relacion);
        return Result<IEnumerable<DestinoCategoriaDTO>>.Success(relacionDto);
    }

    public async Task<Result<DestinoCategoriaDTO>> Create(DestinoCategoriaDTO dto)
    {
        var validationResult = await _validator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
            return Result<DestinoCategoriaDTO>.Failure(new { Errors = errors }, 400);
        }

        var nuevaRelacion = _mapper.Map<DestinoCategoria>(dto);

        _context.DestinoCategorias.Add(nuevaRelacion);
        await _context.SaveChangesAsync();

        var relacionDto = _mapper.Map<DestinoCategoriaDTO>(nuevaRelacion);
        return Result<DestinoCategoriaDTO>.Success(relacionDto);
    }

    public async Task<Result<bool>> Delete(int idDestino, int idCategoria)
    {
        var relacion = await _context.DestinoCategorias
            .FirstOrDefaultAsync(dc => dc.ID_Destino == idDestino && dc.ID_Categoria == idCategoria);

        if (relacion == null)
        {
            return Result<bool>.Failure("Relación no encontrada", 404);
        }

        _context.DestinoCategorias.Remove(relacion);
        await _context.SaveChangesAsync();
        return Result<bool>.Success(true);
    }
}