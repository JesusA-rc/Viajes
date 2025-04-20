using Application.Services;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class CategoriasController : BaseApiController{
    private readonly CategoriasServices _categoriasServices;
    public CategoriasController(CategoriasServices categoriaServices)
    {
        _categoriasServices = categoriaServices;
    }

    [HttpGet]
    public async Task<ActionResult<List<Categorias>>> GetCategorias(){
        var categorias = await _categoriasServices.GetAll();
        return Ok(categorias);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Categorias>> GetCategoria(int id){
        var categoria = await _categoriasServices.GetById(id);
        return Ok(categoria);
    }

    [HttpPost]
    public async Task<ActionResult<Categorias>> CreateCategoria(Categorias categoria){
        var categoriaCreada = await _categoriasServices.CreateCategoria(categoria);
        return Ok(categoriaCreada);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Categorias>> UpdateCategoria(int id, Categorias categoria){
        if (id != categoria.IdCategoria) return BadRequest("El id de la categoria no coincide con el id de la url");
        var categoriaActualizada = await _categoriasServices.UpdateCategoria(id,categoria);
        if (categoriaActualizada)
        {
            return Ok(new { message = "Categoría actualizada exitosamente." });
        }
        else
        {
            return NotFound(new { message = "La categoría no existe." });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Categorias>> DeleteCategoria(int id){
        var categoriaEliminada = await _categoriasServices.DeleteCategoria(id);
        if (categoriaEliminada)
        {
            return Ok(new { message = "Categoría eliminada exitosamente." });
        }
        else
        {
            return NotFound(new { message = "La categoría no existe." });
        }
    }


}
