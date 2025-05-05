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
    

        CreateMap<UsuarioDto, Usuario>()
            .ForMember(dest => dest.ContrasenaHash, opt => opt.Ignore())
            .ForMember(dest => dest.ContrasenaSalt, opt => opt.Ignore()); 

        CreateMap<Usuario, UsuarioDto>();
    }
}