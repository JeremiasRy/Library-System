using Backend.DTOs;
using Backend.Models;
using System.IdentityModel.Tokens.Jwt;

namespace Backend.Services;
    
public interface IJwtTokenService
{
    Task<SignInResponseDTO?> GenerateToken(User user);
    JwtSecurityToken ReadToken(string token);
}