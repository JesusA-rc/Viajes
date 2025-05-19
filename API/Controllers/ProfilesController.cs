using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application;
using Application.interfaces;
using Application.Profiles;
using Application.Profiles.Commands;
using Application.Profiles.Queries;
using Domain;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController : BaseApiController
{
    [HttpPost("add-photo")]
    public async Task<ActionResult<UsuarioFoto>> AddPhoto(IFormFile file)
    {
        return HandleResultMe(await Mediator.Send(new AddPhoto.Command { File = file }));
    }


    [HttpGet("{userId}/photos")]
    public async Task<ActionResult<List<UsuarioFoto>>> GetPhotosForUser(int userId)
    {
        return HandleResultMe(await Mediator.Send(new GetProfilePhotos.Query { UserId = userId }));
    }
    

    [HttpDelete("{photoId}/photos")]
    public async Task<ActionResult> DeletePhoto(int photoId)
    {
        return HandleResultMe(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
    }

/*
    [HttpPut("{photoId}/setMain")]
    public async Task<ActionResult> SetMainPhoto(string photoId)
    {
        return HandleResultMe(await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId }));
    }
*/
    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfile>> GetProfile(string userId)
    {
        return HandleResultMe(await Mediator.Send(new GetProfile.Query { UserId = userId }));
    }
}