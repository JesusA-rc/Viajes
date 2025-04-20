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

    public async Task<Categorias> GetById(int id){
        return await _context.Categorias.FindAsync(id) ?? throw new Exception("Categoria no encontrada");
    }

    public async Task<bool> DeleteCategoria(int id){
        var categoriaToDelete = await GetById(id);
        if(categoriaToDelete != null){
            _context.Categorias.Remove(categoriaToDelete);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<Categorias> CreateCategoria(Categorias cateogorias){
        _context.Categorias.Add(cateogorias);
        await _context.SaveChangesAsync();
        return cateogorias;
    }

    public async Task<bool> UpdateCategoria(int id, Categorias categoria)
    {
        var categoriaToUpdate = await GetById(id);
        if (categoriaToUpdate != null)
        {
            categoriaToUpdate.Nombre = categoria.Nombre;
            categoriaToUpdate.Descripcion = categoria.Descripcion;
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }


    
}