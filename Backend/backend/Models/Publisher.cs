using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class Publisher : BaseModel
{
    [MinLength(2)]
    [MaxLength(50)]
    public string PublisherName { get; set; } = null!;
    [JsonIgnore]
    public ICollection<Book> Books { get; set; } = null!;
}
