using Microsoft.AspNetCore.Mvc;
using Application.Services;
using Application.DTOs;

namespace API.Controllers
{

    public class FavoritosController : BaseApiController
    {
        private readonly FavoritosServices _favoritosServices;

        public FavoritosController(FavoritosServices favoritosServices)
        {
            _favoritosServices = favoritosServices;
        }

        [HttpGet("{usuarioId}")]
        public async Task<ActionResult> GetFavoritosByUsuarioId(int usuarioId)
        {
            var result = await _favoritosServices.GetFavoritosByUsuarioId(usuarioId);
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<ActionResult> AddFavorito([FromBody] FavoritosDto dto)
        {
            var result = await _favoritosServices.AddFavorito(dto);
            return HandleResult(result);
        }

        [HttpDelete("{usuarioId}/{destinoId}")]
        public async Task<ActionResult> RemoveFavorito(int usuarioId, int destinoId)
        {
            var result = await _favoritosServices.RemoveFavorito(usuarioId, destinoId);
            return HandleNoContent(result);
        }
    }
}