using Application.Profiles.DTOs;
using Microsoft.AspNetCore.Http;


namespace Application.interfaces;


public interface IPhotoService
{
    Task<PhotoUploadResult> UploadPhoto(IFormFile file);
    Task<PhotoUploadResult> DeletePhoto(string publicId);
}
