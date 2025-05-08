using Application.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Application.Mappings;
using Persistence;
using FluentValidation;
using Application.Validators;
using API.Middleware;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddValidatorsFromAssemblyContaining<CategoriaValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<DestinoValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UsuarioValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<FavoritosServices>();
builder.Services.AddValidatorsFromAssemblyContaining<EstadosDestinoService>();
builder.Services.AddTransient<ExceptionMiddleware>();


var app = builder.Build();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
