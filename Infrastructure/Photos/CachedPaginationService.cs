using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Application.Profiles.DTOs;
using Microsoft.EntityFrameworkCore;

public class CachedPaginationService<T> : ICachedPaginationService<T>
{
    private readonly IMemoryCache _cache;
    private readonly ILogger<CachedPaginationService<T>> _logger;

    public CachedPaginationService(IMemoryCache cache, ILogger<CachedPaginationService<T>> logger)
    {
        _cache = cache;
        _logger = logger;
    }

    public async Task<PaginatedResponse<T>> GetPaginatedDataAsync(
        string cacheKey,
        int page,
        int limit,
        Func<Task<List<T>>> dataFetchDelegate)
    {
        page = Math.Max(1, page);
        limit = Math.Max(1, limit);

        if (!_cache.TryGetValue(cacheKey, out List<T>? cachedData) || cachedData == null)
        {
            _logger.LogInformation($"Cache miss for key: {cacheKey}");

            cachedData = await dataFetchDelegate();

            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(15))
                .SetSlidingExpiration(TimeSpan.FromMinutes(5));

            _cache.Set(cacheKey, cachedData, cacheEntryOptions);
        }

        var paginatedData = cachedData
            .Skip((page - 1) * limit)
            .Take(limit)
            .ToList();

        return new PaginatedResponse<T>
        {
            Page = page,
            Limit = limit,
            TotalItems = cachedData.Count,
            Items = paginatedData
        };
    }

    public async Task<PaginatedResponse<T>> GetPaginatedAsync(
        IQueryable<T> query,
        int page,
        int limit)
    {
        var totalItems = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * limit)
            .Take(limit)
            .ToListAsync();

        return new PaginatedResponse<T>
        {
            Page = page,
            Limit = limit,
            TotalItems = totalItems,
            Items = items
        };
    }
}
