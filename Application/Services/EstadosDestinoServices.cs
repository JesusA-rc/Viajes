using AutoMapper;
using Domain.Models;
using Application.DTOs;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Validators;

namespace Application.Services
{

    public class EstadosDestinoService 
    {
        private readonly ViajesContext _context;
        private readonly IMapper _mapper;
        private readonly EstadoDestinoValidator _validator;

        public EstadosDestinoService(ViajesContext context, IMapper mapper, EstadoDestinoValidator validator)
        {
            _context = context;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<IEnumerable<EstadosDestinoDetalleDTO>> GetAllAsync()
        {
            var estados = await _context.EstadoDestino
                .Include(ed => ed.Usuario)
                .Include(ed => ed.Destino)
                .ToListAsync();

            return _mapper.Map<IEnumerable<EstadosDestinoDetalleDTO>>(estados);
        }

        public async Task<EstadosDestinoDetalleDTO> GetByIdAsync(int id)
        {
            var estado = await _context.EstadoDestino
                .Include(ed => ed.Usuario)
                .Include(ed => ed.Destino)
                .SingleOrDefaultAsync(ed => ed.Id == id);
            
            if (estado == null)
            {
                throw new KeyNotFoundException($"EstadoDestino con ID {id} no encontrado.");
            }
            
            return _mapper.Map<EstadosDestinoDetalleDTO>(estado);
        }

        public async Task<EstadosDestinoDTO> CreateAsync(EstadosDestinoDTO dto)
        {
            var validationResult = await _validator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            var estado = _mapper.Map<EstadoDestino>(dto);

            _context.EstadoDestino.Add(estado);
            await _context.SaveChangesAsync();

            return _mapper.Map<EstadosDestinoDTO>(estado);
        }

        public async Task UpdateAsync(EstadosDestinoDTO dto)
        {
            var validationResult = await _validator.ValidateAsync(dto);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            var estadoExistente = await _context.EstadoDestino.FindAsync(dto.Id);
            if (estadoExistente == null)
            {
                throw new KeyNotFoundException($"EstadoDestino con ID {dto.Id} no encontrado.");
            }

            _mapper.Map(dto, estadoExistente);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var estado = await _context.EstadoDestino.FindAsync(id);

            if (estado == null)
            {
                throw new KeyNotFoundException($"EstadoDestino con ID {id} no encontrado.");
            }

            _context.EstadoDestino.Remove(estado);
            await _context.SaveChangesAsync();
        }

        //Todos los estados que tiene el usuario
        public async Task<IEnumerable<EstadosDestinoDetalleDTO>> GetByUsuarioIdAsync(int usuarioId)
        {
            var estados = await _context.EstadoDestino
                .Include(ed => ed.Usuario)      
                .Include(ed => ed.Destino)      
                .Where(ed => ed.UsuarioId == usuarioId)
                .ToListAsync();
                
            return _mapper.Map<IEnumerable<EstadosDestinoDetalleDTO>>(estados);
        }

        //
        public async Task<IEnumerable<EstadosDestinoDTO>> GetByDestinoIdAsync(int destinoId)
        {
            var estados = await _context.EstadoDestino
                .Where(ed => ed.DestinoId == destinoId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<EstadosDestinoDTO>>(estados);
        }

        public async Task<IEnumerable<EstadosDestinoDTO>> GetByEstadoAsync(string estado)
        {
            var estados = await _context.EstadoDestino
                .Where(ed => ed.Estado == estado)
                .ToListAsync();
            return _mapper.Map<IEnumerable<EstadosDestinoDTO>>(estados);
        }
    }
}