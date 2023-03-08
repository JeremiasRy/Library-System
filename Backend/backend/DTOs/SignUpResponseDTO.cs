namespace Backend.DTOs;

using Backend.Models;

public class SignUpResponseDTO
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Firstname { get; set; } = null!;
    public string Lastname { get; set; } = null!;
    public static SignUpResponseDTO FromUser(User user)
    {
        return new SignUpResponseDTO()
        {
            Id = user.Id,
            Username = user.UserName,
            Firstname = user.Firstname,
            Lastname = user.Lastname,
        };
    }
}
