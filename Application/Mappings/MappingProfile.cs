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
        CreateMap<Favoritos, FavoritosDto>().ReverseMap();
        CreateMap<EstadoDestino, EstadosDestinoDTO>().ReverseMap();
        CreateMap<EstadoDestino, EstadosDestinoDetalleDTO>()
            .ForMember(dest => dest.UsuarioNombre, opt => opt.MapFrom(src => src.Usuario.Nombre))
            .ForMember(dest => dest.Destino, opt => opt.MapFrom(src => src.Destino));
    }
}