using System;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services;

public class DestinosServices{
    private readonly ViajesContext _context;
    public DestinosServices(ViajesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Destinos>> GetAll()
    {
        return await _context.Destinos.ToListAsync();
    }

    public async Task<Destinos> GetById(int id){
        return await _context.Destinos.FindAsync(id) ?? throw new Exception("Destino no encontrado");
    }

    public async Task<bool> DeleteDestino(int id){
        var destino = await GetById(id);
        if(destino != null) {
            _context.Destinos.Remove(destino);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<Destinos> CreateDestino(Destinos destino)
    {
        _context.Destinos.Add(destino);
        await _context.SaveChangesAsync();
        return destino;
    }

    public async Task<bool> UpdateDestino(int id, Destinos destinos){
        var destinoToUpdate = await GetById(id);
        if(destinoToUpdate !=null){
            destinoToUpdate.Nombre = destinos.Nombre;
            destinoToUpdate.Descripcion = destinos.Descripcion;
            destinoToUpdate.Imagen = destinos.Imagen;
            destinoToUpdate.Region = destinos.Region;
            _context.Destinos.Update(destinoToUpdate);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;

    }


}
