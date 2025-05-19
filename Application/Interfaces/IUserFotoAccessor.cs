using Domain;
using Domain.Models;

namespace Application.interfaces;

public interface IUserFotoAccessor
{
    string GetUserId();
    
    Task<UsuarioFoto?> GetUserFotoAsync();
    Task<List<UsuarioFoto>> GetFotosByUsuarioAsync();
    Task<Usuario> GetUsuarioAsync();
}
