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

        CreateMap<Favoritos, FavoritosDto>()
            .ForMember(dest => dest.Destino, opt => opt.MapFrom(src => src.Destino));
        
        CreateMap<EstadoDestino, EstadosDestinoDTO>().ReverseMap();
        CreateMap<EstadoDestino, EstadosDestinoDetalleDTO>()
            .ForMember(dest => dest.UsuarioNombre, opt => opt.MapFrom(src => src.Usuario.Nombre))
            .ForMember(dest => dest.Destino, opt => opt.MapFrom(src => src.Destino));

        CreateMap<DestinoCategoria, DestinoCategoriaDTO>().ReverseMap();
        CreateMap<DestinoCategoria, CategoriaDto>()
            .ForMember(dest => dest.IdCategoria, opt => opt.MapFrom(src => src.Categoria.IdCategoria))
            .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Categoria.Nombre));

        CreateMap<Destinos, DestinoDto>()
            .ForMember(dest => dest.Categorias, opt => opt.MapFrom(src => src.DestinoCategoria));
    

        CreateMap<UsuarioDto, Usuario>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) 
            .ForMember(dest => dest.SecurityStamp, opt => opt.Ignore()); 

        CreateMap<Usuario, UsuarioDto>()
            .ForMember(dest => dest.Password, opt => opt.Ignore()); //No pone el hash



    }
}