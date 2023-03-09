namespace Backend.DTOs;

using Backend.Models;

public class UserResponseDTO
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Firstname { get; set; } = null!;
    public string Lastname { get; set; } = null!;
    public string Email { get; set; } = null!;
    public static UserResponseDTO FromUser(User user)
    {
        return new UserResponseDTO()
        {
            Id = user.Id,
            Username = user.UserName,
            Firstname = user.Firstname,
            Lastname = user.Lastname,
            Email = user.Email,
        };
    }
}
