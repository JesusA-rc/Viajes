using Application.Services;
using Domain.Models;
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
        var destinos = await _destinosServices.GetAll();
        return Ok(destinos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Destinos>> GetDestino(int id)
    {
        var destino = await _destinosServices.GetById(id);
        return Ok(destino);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> EditDestino(int id,Destinos destino)
    {
        var destinoToUpdate = await _destinosServices.UpdateDestino(id,destino);
        return Ok(destinoToUpdate);
    }

    [HttpPost]
    public async Task<ActionResult> CreateDestino(Destinos destino)
    {
        var destinoToCreate = await _destinosServices.CreateDestino(destino);
        return Ok(destinoToCreate);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDestino(int id)
    {
        var destinoToDelete = await _destinosServices.DeleteDestino(id);
        if(destinoToDelete == true){
            return Ok(new {message = "Destino eliminado correctamente"});
        }else{
            return NotFound(new {message = "Destino no encontrado"});
        }
    }


}