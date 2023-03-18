namespace Backend.Services;

using Backend.DTOs;
using Backend.DTOs.User;
using Backend.Models;
using Microsoft.AspNetCore.Identity;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly IJwtTokenService _jwtTokenService;
    public UserService(UserManager<User> userManager, IJwtTokenService JwtTokenService)
    {
        _userManager = userManager;
        _jwtTokenService = JwtTokenService;
    }
    public async Task<User?> GetByIdAsync(int id)
    {
        return await _userManager.FindByIdAsync(id.ToString());
    }
    public async Task<User?> SignUpAsync(SignInDTO request)
    {
        var user = new User()
        {
            UserName = request.Username,
            Firstname = request.Firstname,
            Lastname = request.Lastname,
            Email = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        await _userManager.AddToRoleAsync(user, "Customer");

        if (!result.Succeeded)
        {
            return null;
        }
        return user;
    }
    public async Task<SignInResponseDTO?> SignInAsync(CredentialsDTO request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (!await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return null;
        }
        return await _jwtTokenService.GenerateToken(user);

    }
    public async Task<bool> AssignRolesToUserAsync(string[] roles, User user)
    {
        var result = await _userManager.AddToRolesAsync(user, roles);
        return result.Succeeded;
    }
    public async Task<User?> UpdateUserAsync(UpdateUserDTO request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return null;
        }
        if (request.NewPassword != null)
        {
            await _userManager.ChangePasswordAsync(user, request.Password, request.NewPassword);
        }
        request.UpdateUser(user);

        await _userManager.UpdateAsync(user);
        return user;
    }
}
