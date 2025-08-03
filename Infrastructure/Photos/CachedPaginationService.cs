using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

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
        // Validación de parámetros
        page = Math.Max(1, page);
        limit = Math.Max(1, limit);

        // Intento obtener datos de la caché
        if (!_cache.TryGetValue(cacheKey, out List<T> cachedData))
        {
            _logger.LogInformation($"Cache miss for key: {cacheKey}");
            
            // Obtengo datos frescos si no están en caché
            cachedData = await dataFetchDelegate();
            
            // Configuro opciones de caché
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(30))
                .SetSlidingExpiration(TimeSpan.FromSeconds(30))
                .SetSize(1024);
            
            _cache.Set(cacheKey, cachedData, cacheEntryOptions);
        }

        // Aplico paginación
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
}