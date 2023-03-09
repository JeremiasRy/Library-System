namespace Backend.Models;

using Backend.DTOs;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class Loan : BaseModel
{
    [JsonIgnore]
    public int CopyId { get; set; }
    public Copy Copy { get; set; } = null!;
    [JsonIgnore]
    public int UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; } = null!;
    public UserResponseDTO? UserInfo => User != null ? UserResponseDTO.FromUser(User) : null;
    public DateTime LoanedAt { get; set; }
    public DateTime DueDate { get; set; }
    public bool Returned { get; set; } = false;
}
