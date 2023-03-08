using Backend.DTOs;
using Backend.Models;

namespace Backend.Services;

public interface IUserService
{
    Task<bool> AssignRolesToUser(string[] roles, User user);
    Task<User?> GetById(int id);
    Task<SignInResponseDTO?> SignIn(CredentialsDTO request);
    Task<User?> SignUp(RegisterDTO request);
}
