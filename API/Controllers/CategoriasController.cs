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

}
