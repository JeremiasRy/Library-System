namespace Backend.DTOs;

using Backend.Models;

public class SignInResponseDTO
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Firstname { get; set; } = null!;
    public string Lastname { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Token { get; set; } = null!;
    public string[] Roles { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }
    public static SignInResponseDTO CreateResponse(Models.User user, string token, DateTime expires, IList<string> roles)
    {
        return new SignInResponseDTO
        {
            Id = user.Id,
            Username = user.UserName,
            Firstname = user.Firstname,
            Lastname = user.Lastname,
            Email = user.Email,
            Token = token,
            ExpiresAt = expires,
            Roles = roles.ToArray()
        };
    }
}
