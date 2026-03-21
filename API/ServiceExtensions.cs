using Application.interfaces;
using Application.Mappings;
using Application.Services;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {

        services.AddOpenApi();
        services.AddCors();
        
        services.AddSqlServer<ViajesContext>(config.GetConnectionString("DefaultConnection"));
        services.AddDbContext<ViajesContext>(options => 
            options.UseSqlServer(config.GetConnectionString("DefaultConnection")));

        // Servicios personalizados
        services.AddScoped<DestinosServices>();
        services.AddScoped<CategoriasServices>();
        services.AddScoped<UsuariosServices>();
        services.AddScoped<FavoritosServices>();
        services.AddScoped<EstadosDestinoService>();
        services.AddScoped<DestinoCategoriaService>();
        
        services.AddAutoMapper(cfg => {}, typeof(MappingProfile).Assembly);
        services.AddScoped<IUserFotoAccessor, UserFotoAccesor>();
        services.AddScoped<IPhotoService, PhotoService>();

        services.AddMediatR(cfg => 
            cfg.RegisterServicesFromAssembly(typeof(Application.Profiles.Commands.AddPhoto.Handler).Assembly));

        return services;
    }
}