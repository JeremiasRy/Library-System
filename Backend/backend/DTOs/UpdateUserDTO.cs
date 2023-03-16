using System.Runtime.CompilerServices;

namespace Backend.DTOs.User;

public class UpdateUserDTO : SignInDTO
{
    public string? NewPassword { get; set; }
    public void UpdateUser(Models.User user)
    {
        user.UserName = Username;
        user.Firstname = Firstname;
        user.Lastname = Lastname;
        user.Email = Email;
    }
}
