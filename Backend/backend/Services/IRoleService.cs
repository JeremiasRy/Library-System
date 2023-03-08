using Backend.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services
{
    public interface IRoleService
    {
        Task<int> AddRoles(RoleDTO request);
        Task<ICollection<IdentityRole<int>>> GetRoles(RoleDTO request);
    }
}