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
            var photo = user.FirstOrDefault(x => x.Id ==  request.PhotoId);

            if (photo == null) 
                return Result<Unit>.Failure("Cannot find photo", 400);

            await photoService.DeletePhoto(photo.PublicId);

            user.Remove(photo);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem deleting photo", 400);
        }
    }
}