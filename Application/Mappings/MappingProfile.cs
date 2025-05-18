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

        CreateMap<Usuario, UsuarioDto>();
        CreateMap<Favoritos, FavoritosDto>().ReverseMap();
        CreateMap<EstadoDestino, EstadosDestinoDTO>().ReverseMap();
        CreateMap<EstadoDestino, EstadosDestinoDetalleDTO>()
            .ForMember(dest => dest.UsuarioNombre, opt => opt.MapFrom(src => src.Usuario.Nombre))
            .ForMember(dest => dest.Destino, opt => opt.MapFrom(src => src.Destino));

        CreateMap<DestinoCategoria, DestinoCategoriaDTO>().ReverseMap();
    

        CreateMap<UsuarioDto, Usuario>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) 
            .ForMember(dest => dest.SecurityStamp, opt => opt.Ignore()); 

        CreateMap<Usuario, UsuarioDto>()
            .ForMember(dest => dest.Password, opt => opt.Ignore()); //No pone el hash



    }
}