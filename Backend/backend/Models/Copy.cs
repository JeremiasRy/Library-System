using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class Copy : BaseModel
{
    public bool IsAvailable { get; set; } = true;
    [JsonIgnore]
    public int PublisherId { get; set; }
    public Publisher Publisher { get; set; } = null!;
    [JsonIgnore]
    public int BookId { get; set; }
    [JsonIgnore]
    public Book Book { get; set; } = null!;
    [NotMapped]
    public string? Title { get => Book?.Title; }
    [JsonIgnore]
    public ICollection<Loan> Loans { get; set; } = null!;
}
