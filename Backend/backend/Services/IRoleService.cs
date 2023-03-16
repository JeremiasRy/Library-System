using Backend.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services
{
    public interface IRoleService
    {
        Task<int> AddRolesAsync(RoleDTO request);
        Task<ICollection<IdentityRole<int>>> GetRolesAsync(RoleDTO request);
    }
}