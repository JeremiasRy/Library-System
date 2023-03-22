namespace Backend.Controllers;

using Backend.DTOs;
using Backend.DTOs.User;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

public class UserController : ApiBaseController
{
    private readonly IUserService _service;
    private readonly IRoleService _roleService;
    private readonly IJwtTokenService _jwtTokenService;
    public UserController(IUserService service, IRoleService roleService, IJwtTokenService tokenService)
    {
        _service = service;
        _roleService = roleService;
        _jwtTokenService = tokenService;
    }
    [HttpGet, Authorize]
    public IActionResult CheckAuthorization()
    {
        return Ok();
    }
    [HttpPost("register"), AllowAnonymous]
    public async Task<ActionResult<UserResponseDTO?>> SignUp(SignInDTO request)
    {
        var result = await _service.SignUpAsync(request);
        if (result is null)
        {
            return BadRequest();
        }
        return Ok(UserResponseDTO.FromUser(result));
    }
    [HttpPost("login"), AllowAnonymous]
    public async Task<ActionResult<SignInResponseDTO?>> Login(CredentialsDTO request)
    {
        var result = await _service.SignInAsync(request);
        if (result is null)
        {
            return BadRequest();
        }
        return Ok(result);
    }
    [HttpPost("roles"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddRole(RoleDTO request)
    {
        var amountAdded = await _roleService.AddRolesAsync(request);
        return Ok(new { Added = amountAdded });
    }
    [HttpPost("{id:int}/roles"), Authorize(Roles = "Admin")]
    public async Task<bool> AddRoleToUser([FromBody] RoleDTO request, [FromRoute] int id)
    {
        var roles = await _roleService.GetRolesAsync(request);
        var user = await _service.GetByIdAsync(id);
        if (user is null)
        {
            return false;
        }
        return await _service.AssignRolesToUserAsync(roles.Select(role => role.Name).ToArray(), user);
    }
    [HttpPut("{id:int}"), Authorize(Roles = "Admin,Customer")]
    public async Task<bool> EditUser([FromRoute] int id, [FromBody] UpdateUserDTO updateUser)
    {
        Request.Headers.TryGetValue("Authorization", out var token);
        var jwtToken = _jwtTokenService.ReadToken(token[0].Replace("Bearer ", string.Empty));
        if (int.TryParse(jwtToken.Subject, out int userId))
        {
            if (userId != id)
            {
                return false;
            }
        }
        var user = await _service.UpdateUserAsync(updateUser);
        if (user is null)
        {
            return false;
        }
        return true;
    }
}
