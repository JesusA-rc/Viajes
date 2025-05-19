using System;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class AddPhoto
{
    public class Command : IRequest<Result<UsuarioFoto>>
    {
        public required IFormFile File { get; set; }
    }

    public class Handler(IUserFotoAccessor userAccessor, ViajesContext context, 
        IPhotoService photoService) : IRequestHandler<Command, Result<UsuarioFoto>>
    {
        public async Task<Result<UsuarioFoto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadResult = await photoService.UploadPhoto(request.File);
            if (uploadResult == null) 
                return Result<UsuarioFoto>.Failure("Error al subir la foto a Cloudinary", 400);

            var user = await userAccessor.GetUsuarioAsync();
            if (user == null) 
                return Result<UsuarioFoto>.Failure("Usuario no encontrado", 404);

            var photo = new UsuarioFoto
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                UsuarioId = user.Id
            };

            if (string.IsNullOrEmpty(user.FotoPerfil))
                user.FotoPerfil = photo.Url;

            // Guarda en la bd
            context.UsuarioFotos.Add(photo);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<UsuarioFoto>.Success(photo)
                : Result<UsuarioFoto>.Failure("Error al guardar en la base de datos", 400);
        }
    }
}