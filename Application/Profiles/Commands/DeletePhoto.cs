using System;
using Application.interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required int PhotoId { get; set; }
    }

    public class Handler(ViajesContext context, IUserFotoAccessor userAccessor,
        IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetFotosByUsuarioAsync();
            var photo = user.FirstOrDefault(x => x.Id == request.PhotoId);

            if (photo == null) 
                return Result<Unit>.Failure("Foto no encontrada", 404);
                
            // if (!string.IsNullOrEmpty(photo.PublicId))
            // {
            //     var cloudinaryResult = await photoService.DeletePhoto(photo.PublicId);
            //     if (!cloudinaryResult) 
            //         return Result<Unit>.Failure("Error al eliminar de Cloudinary", 500);
            // }

            context.UsuarioFotos.Remove(photo);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Error al guardar cambios en base de datos", 500);
        }
    }
}