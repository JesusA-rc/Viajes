using Application.Services;
using Domain.Models;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DestinosController : BaseApiController
{
    private readonly DestinosServices _destinosServices;

    public DestinosController(DestinosServices destinosServices)
    {
        _destinosServices = destinosServices;
    }

    [HttpGet]
    public async Task<ActionResult<List<Destinos>>> GetDestinos()
    {
        var result = await _destinosServices.GetAll();
        return HandleResult(result);
    }

    [HttpGet("with-categories")]
    public async Task<IActionResult> GetDestinosWithCategories()
    {
        var result = await _destinosServices.GetAllWithCategories();
        return HandleResult(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Destinos>> GetDestino(int id)
    {
        var result = await _destinosServices.GetById(id);
        return HandleResult(result); 
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> EditDestino(int id, Destinos destino)
    {
        try
        {
            var result = await _destinosServices.UpdateDestino(id, destino);
            return HandleResult(result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Errors); 
        }
    }

    [HttpPost]
    public async Task<ActionResult> CreateDestino([FromBody] Destinos destino)
    {
        try
        {
            var result = await _destinosServices.CreateDestino(destino);
            return HandleResult(result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Errors); 
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDestino(int id)
    {
        var result = await _destinosServices.DeleteDestino(id);
        return HandleNoContent(result);
    }
}