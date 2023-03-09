namespace Backend.Controllers;

using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

public class UserController : ApiBaseController
{
    private readonly IUserService _service;
    private readonly IRoleService _roleService;
    public UserController(IUserService service, IRoleService roleService)
    {
        _service = service;
        _roleService = roleService;
    }
    [HttpPost("register"), AllowAnonymous]
    public async Task<UserResponseDTO?> SignUp(RegisterDTO request)
    {
        var result = await _service.SignUp(request);
        if (result is null)
        {
            return null;
        }
        return UserResponseDTO.FromUser(result);
    }
    [HttpPost("login"), AllowAnonymous]
    public async Task<SignInResponseDTO?> Login(CredentialsDTO request)
    {
        return await _service.SignIn(request);
    }
    [HttpPost("roles"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddRole(RoleDTO request)
    {
        var amountAdded = await _roleService.AddRoles(request);
        return Ok(new { Added = amountAdded });
    }
    [HttpPost("{id:int}/roles"), Authorize(Roles = "Admin")]
    public async Task<bool> AddRoleToUser([FromBody] RoleDTO request, [FromRoute] int id)
    {
        var roles = await _roleService.GetRoles(request);
        var user = await _service.GetById(id);
        if (user is null)
        {
            return false;
        }
        return await _service.AssignRolesToUser(roles.Select(role => role.Name).ToArray(), user);
    }
}
