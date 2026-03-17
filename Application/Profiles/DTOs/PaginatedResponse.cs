namespace Application.Profiles.DTOs;

public class PaginatedResponse<T>
{
    public int Page { get; set; }
    public int Limit { get; set; }
    public int TotalItems { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalItems / Limit);
    public List<T> Items { get; set; } = new List<T>();
}