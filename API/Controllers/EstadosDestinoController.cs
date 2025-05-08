using Microsoft.AspNetCore.Mvc;
using Application.DTOs;
using Application.Services;
using FluentValidation;

namespace API.Controllers;


public class EstadosDestinoController : BaseApiController
{
    private readonly EstadosDestinoService _estadosDestinoService;

    public EstadosDestinoController(EstadosDestinoService estadosDestinoService)
    {
        _estadosDestinoService = estadosDestinoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EstadosDestinoDTO>>> GetAll()
    {
        var estados = await _estadosDestinoService.GetAllAsync();
        return Ok(estados);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EstadosDestinoDTO>> GetById(int id)
    {
        try
        {
            var estado = await _estadosDestinoService.GetByIdAsync(id);
            return Ok(estado);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<EstadosDestinoDTO>> Create(EstadosDestinoDTO dto)
    {
        try
        {
            var nuevoEstado = await _estadosDestinoService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = nuevoEstado.Id }, nuevoEstado);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, EstadosDestinoDTO dto)
    {
        if (id != dto.Id)
        {
            return BadRequest("ID en la URL no coincide con el ID en el cuerpo de la solicitud.");
        }

        try
        {
            await _estadosDestinoService.UpdateAsync(dto);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _estadosDestinoService.DeleteAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet("usuario/{usuarioId}")]
    public async Task<ActionResult<IEnumerable<EstadosDestinoDTO>>> GetByUsuarioId(int usuarioId)
    {
        var estados = await _estadosDestinoService.GetByUsuarioIdAsync(usuarioId);
        return Ok(estados);
    }

    [HttpGet("destino/{destinoId}")]
    public async Task<ActionResult<IEnumerable<EstadosDestinoDTO>>> GetByDestinoId(int destinoId)
    {
        var estados = await _estadosDestinoService.GetByDestinoIdAsync(destinoId);
        return Ok(estados);
    }

    [HttpGet("estado/{estado}")]
    public async Task<ActionResult<IEnumerable<EstadosDestinoDTO>>> GetByEstado(string estado)
    {
        var estados = await _estadosDestinoService.GetByEstadoAsync(estado);
        return Ok(estados);
    }
}
