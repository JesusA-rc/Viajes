using Application.Services;
using Application.DTOs;
using Domain.Models;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.Data;

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
    public async Task<ActionResult> CreateUsuario([FromBody] UsuarioDto usuarioDto)
    {
        try
        {
            var result = await _usuariosServices.CreateUsuario(usuarioDto);
            return HandleResult(result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Errors);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error inesperado: {ex.Message}");
            return StatusCode(500, "Error interno del servidor");
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

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var result = await _usuariosServices.Login(request.Email, request.Password);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return Unauthorized(new { isAuthenticated = false });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error inesperado: {ex.Message}");
            return StatusCode(500, "Error interno del servidor");
        }
    }

    [HttpGet("favoritos/{usuarioId}")]
    public async Task<ActionResult> GetFavoritosByUsuarioId(int usuarioId)
    {
        try
        {
            var result = await _usuariosServices.GetFavoritosByUsuarioId(usuarioId);

            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }

            return NotFound(new { message = result.Error }); 
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error inesperado: {ex.Message}");
            return StatusCode(500, "Error interno del servidor");
        }
    }

}