using Microsoft.AspNetCore.Mvc;
using Application.Services;
using Application.DTOs;

namespace API.Controllers;

public class DestinoCategoriaController : BaseApiController
{
    private readonly DestinoCategoriaService _destinoCategoriaService;

    public DestinoCategoriaController(DestinoCategoriaService destinoCategoriaService)
    {
        _destinoCategoriaService = destinoCategoriaService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllRelaciones()
    {
        var result = await _destinoCategoriaService.GetAll();
        return HandleResult(result);
    }

    [HttpGet("destino/{idDestino}")]
    public async Task<IActionResult> GetAllCategoriasByDestino(int idDestino){
        var result = await _destinoCategoriaService.GetAllByDestino(idDestino);
        return HandleResult(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateRelacion([FromBody] DestinoCategoriaDTO dto)
    {
        var result = await _destinoCategoriaService.Create(dto);
        return HandleResult(result);
    }

    [HttpDelete("{idDestino}/{idCategoria}")]
    public async Task<IActionResult> DeleteRelacion(int idDestino, int idCategoria)
    {
        var result = await _destinoCategoriaService.Delete(idDestino, idCategoria);
        return HandleNoContent(result);
    }
}