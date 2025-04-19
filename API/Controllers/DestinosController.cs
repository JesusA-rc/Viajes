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

    [HttpPut]
    public async Task<ActionResult> EditDestino(Destinos destino)
    {
        return NoContent();
    }


}