using Application.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Application.Mappings;
using Persistence;
using FluentValidation;
using Application.Validators;
using API.Middleware;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Application.interfaces;
using Infrastructure.Security;
using Infrastructure.Photos;
using MediatR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(opt =>
{
    //Politica de autenticacion
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().
    Build();
    //La aplica globalmente
    opt.Filters.Add(new AuthorizeFilter(policy));

});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSqlServer<ViajesContext>(builder.Configuration.GetConnectionString("DefaultConnection"));
builder.Services.AddCors();
builder.Services.AddDbContext<ViajesContext>(options =>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<DestinosServices>();
builder.Services.AddScoped<CategoriasServices>();
builder.Services.AddScoped<UsuariosServices>();
builder.Services.AddScoped<FavoritosServices>();
builder.Services.AddScoped<EstadosDestinoService>();
builder.Services.AddScoped<DestinoCategoriaService>();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<IUserFotoAccessor, UserFotoAccesor>();
builder.Services.AddScoped<IPhotoService, PhotoService>();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Application.Profiles.Commands.AddPhoto.Handler).Assembly));

builder.Services.AddValidatorsFromAssemblyContaining<CategoriaValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<DestinoValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UsuarioValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<FavoritosValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<EstadosDestinoService>();
builder.Services.AddValidatorsFromAssemblyContaining<DestinoCategoriaValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();

builder.Services.AddIdentityApiEndpoints<Usuario>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole<int>>()
.AddApiEndpoints()
.AddEntityFrameworkStores<ViajesContext>();

builder.Services.Configure<CloudinarySettings>(builder.Configuration
    .GetSection("CloudinarySettings"));


builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.HttpOnly = true;
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
});

var app = builder.Build();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(x => x
    .WithOrigins("http://localhost:5173", "https://localhost:5173")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .SetIsOriginAllowed(_ => true));


app.UseAuthentication(); 
app.UseAuthorization();  

app.UseHttpsRedirection();


app.MapControllers();
app.MapGroup("api").MapIdentityApi<Usuario>();

app.Run();
