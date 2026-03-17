using Application.Profiles.DTOs;

public interface ICachedPaginationService<T>
{
    Task<PaginatedResponse<T>> GetPaginatedDataAsync(
        string cacheKey, 
        int page, 
        int limit, 
        Func<Task<List<T>>> dataFetchDelegate);

    Task<PaginatedResponse<T>> GetPaginatedAsync(
        IQueryable<T> query,
        int page,
        int limit);
}