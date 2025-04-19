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


}
