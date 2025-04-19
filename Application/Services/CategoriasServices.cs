using System;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services;

public class CategoriasServices{
    private readonly ViajesContext _context;
    
    public CategoriasServices(ViajesContext context)
    {
        _context = context;
    }

    
    public async Task<IEnumerable<Categorias>> GetAll()
    {
        return await _context.Categorias.ToListAsync();
    }
    
}