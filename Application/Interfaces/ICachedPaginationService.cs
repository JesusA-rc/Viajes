public interface ICachedPaginationService<T>
{
    Task<PaginatedResponse<T>> GetPaginatedDataAsync(
        string cacheKey, 
        int page, 
        int limit, 
        Func<Task<List<T>>> dataFetchDelegate);
}