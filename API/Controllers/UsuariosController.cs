using Application.Services;
using Application.DTOs;
using Domain.Models;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UsuariosController : BaseApiController
{
    private readonly UsuariosServices _usuariosServices;

    public UsuariosController(UsuariosServices usuariosServices)
    {
        _usuariosServices = usuariosServices;
    }

    [HttpGet]
    public async Task<ActionResult<List<UsuarioDto>>> GetUsuarios()
    {
        var result = await _usuariosServices.GetAll();
        return HandleResult(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UsuarioDto>> GetUsuario(int id)
    {
        var result = await _usuariosServices.GetById(id);
        return HandleResult(result);
    }

    [HttpPost]
    public async Task<ActionResult> CreateUsuario([FromBody] Usuario usuario)
    {
        try
        {
            var result = await _usuariosServices.CreateUsuario(usuario);
            return HandleResult(result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Errors);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> EditUsuario(int id, Usuario usuario)
    {
        try
        {
            var result = await _usuariosServices.UpdateUsuario(id, usuario);
            return HandleResult(result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Errors); 
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUsuario(int id)
    {
        var result = await _usuariosServices.DeleteUsuario(id);
        return HandleNoContent(result);
    }
}