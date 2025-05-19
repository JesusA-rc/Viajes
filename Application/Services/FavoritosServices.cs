using Domain.Models;
using Application.DTOs;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using Application.Validators;
using FluentValidation;

namespace Application.Services
{
    public class FavoritosServices
    {
        private readonly ViajesContext _context;
        private readonly IMapper _mapper;
        private readonly FavoritosValidator _validator;

        public FavoritosServices(ViajesContext context, IMapper mapper, FavoritosValidator validator)
        {
            _context = context;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Result<IEnumerable<FavoritosDto>>> GetFavoritosByUsuarioId(int usuarioId)
        {
            var favoritos = await _context.Favoritos
                .Where(f => f.UsuarioId == usuarioId)
                .Include(f => f.Destino)
                    .ThenInclude(d => d.DestinoCategoria)
                        .ThenInclude(dc => dc.Categoria)
                .ToListAsync();

            if (favoritos == null || favoritos.Count == 0)
            {
                return Result<IEnumerable<FavoritosDto>>.Failure("No se encontraron favoritos para este usuario", 404);
            }

            var favoritosDto = _mapper.Map<IEnumerable<FavoritosDto>>(favoritos);
            return Result<IEnumerable<FavoritosDto>>.Success(favoritosDto);
        }

        public async Task<Result<FavoritosDto>> AddFavorito(FavoritosDto dto)
        {
            var validationResult = _validator.Validate(dto);
            if (!validationResult.IsValid)
            {
                var errors = string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage));
                return Result<FavoritosDto>.Failure($"Errores de validación: {errors}", 400);
            }

            var exists = await _context.Favoritos
                .AnyAsync(f => f.UsuarioId == dto.UsuarioId && f.DestinoId == dto.DestinoId);

            if (exists)
            {
                return Result<FavoritosDto>.Failure("Este destino ya está marcado como favorito", 400);
            }

            var favorito = _mapper.Map<Favoritos>(dto);
            _context.Favoritos.Add(favorito);
            await _context.SaveChangesAsync();

            var favoritoDto = _mapper.Map<FavoritosDto>(favorito);
            return Result<FavoritosDto>.Success(favoritoDto);
        }

        public async Task<Result<bool>> RemoveFavorito(int usuarioId, int destinoId)
        {
            var favoritoToRemove = await _context.Favoritos
                .FirstOrDefaultAsync(f => f.UsuarioId == usuarioId && f.DestinoId == destinoId);

            if (favoritoToRemove == null)
            {
                return Result<bool>.Failure("Favorito no encontrado", 404);
            }

            _context.Favoritos.Remove(favoritoToRemove);
            await _context.SaveChangesAsync();
            return Result<bool>.Success(true);
        }
    }
}