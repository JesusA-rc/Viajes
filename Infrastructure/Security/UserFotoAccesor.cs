using System.Linq.Expressions;
using System.Security.Claims;
using Application.interfaces;
using Domain;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class UserFotoAccesor(IHttpContextAccessor httpContextAccessor, ViajesContext dbContext) : IUserFotoAccessor
{

    public async Task<Usuario> GetUsuarioAsync()
    {
        var userId = GetUserId(); // Usa el método local para obtener el ID
        if (userId == null)
            throw new Exception("Usuario no autenticado");

        // Convierte el userId a int (si es necesario, ya que Usuario hereda de IdentityUser<int>)
        var userIdInt = Convert.ToInt32(userId);

        return await dbContext.Usuarios
            .Include(u => u.FotosAdicionales)
            .FirstOrDefaultAsync(u => u.Id ==  userIdInt);
    }

    public string GetUserId()
    {
        var userId = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            throw new Exception("Usuario no autenticado");

        return userId; // Convierte a int (porque Usuario.Id es int)
    }
    
    public async Task<UsuarioFoto?> GetUserFotoAsync()
    {
        var userId = Convert.ToInt32(GetUserId());
        return await dbContext.UsuarioFotos
            .FirstOrDefaultAsync(uf => uf.UsuarioId == userId);
    }

    public async Task<List<UsuarioFoto>> GetFotosByUsuarioAsync()
    {
        var userId = Convert.ToInt32(GetUserId());
        return await dbContext.UsuarioFotos
            .Where(uf => uf.UsuarioId == userId)
            .ToListAsync();
    }
}