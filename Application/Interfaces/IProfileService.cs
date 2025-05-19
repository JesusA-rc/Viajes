using Application.Profiles;

namespace Application.interfaces;

public interface IProfileService
{
    Task<Result<UserProfile>> GetProfile(string userId);
}