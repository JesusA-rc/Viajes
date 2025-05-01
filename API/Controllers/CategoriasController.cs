using Microsoft.AspNetCore.Mvc;
using Application.Services;
using Domain.Models;

namespace API.Controllers;


public class CategoriasController : BaseApiController
{
    private readonly CategoriasServices _categoriasServices;

    public CategoriasController(CategoriasServices categoriasServices)
    {
        _categoriasServices = categoriasServices;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategorias()
    {
        var result = await _categoriasServices.GetAll();
        return HandleResult(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoria(int id)
    {
        var result = await _categoriasServices.GetById(id);
        return HandleResult(result); 
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategoria([FromBody] Categorias categoria)
    {
        var result = await _categoriasServices.CreateCategoria(categoria);
        return HandleResult(result); 
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategoria(int id, [FromBody] Categorias categoria)
    {
        if (id != categoria.IdCategoria)
        {
            return BadRequest(new { error = "El id de la categoría no coincide con el id de la URL" });
        }

        var result = await _categoriasServices.UpdateCategoria(id, categoria);
        return HandleResult(result); 
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategoria(int id)
    {
        var result = await _categoriasServices.DeleteCategoria(id);
        return HandleNoContent(result);
    }
}