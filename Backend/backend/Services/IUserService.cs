using Backend.DTOs;
using Backend.DTOs.User;
using Backend.Models;

namespace Backend.Services;

public interface IUserService
{
    Task<bool> AssignRolesToUserAsync(string[] roles, User user);
    Task<User?> GetByIdAsync(int id);
    Task<SignInResponseDTO?> SignInAsync(CredentialsDTO request);
    Task<User?> SignUpAsync(SignInDTO request);
    Task<User?> UpdateUserAsync(UpdateUserDTO request);
}
