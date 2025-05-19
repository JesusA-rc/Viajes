using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfilePhotos
{
    public class Query : IRequest<Result<List<UsuarioFoto>>>
    {
        public required int UserId { get; set; }
    }

    public class Handler(ViajesContext context) : IRequestHandler<Query, Result<List<UsuarioFoto>>>
    {
        public async Task<Result<List<UsuarioFoto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var photos = await context.Users
                .Where(x => x.Id == request.UserId)
                .SelectMany(x => x.FotosAdicionales)
                .ToListAsync(cancellationToken);

            return Result<List<UsuarioFoto>>.Success(photos);
        }
    }
}