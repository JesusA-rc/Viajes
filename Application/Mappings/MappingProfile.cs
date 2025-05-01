using AutoMapper;
using Domain.Models;
using Application.DTOs;

namespace Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Categorias, CategoriaDto>();
        CreateMap<Destinos, DestinoDto>();
    }
}