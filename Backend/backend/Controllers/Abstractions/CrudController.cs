﻿namespace Backend.Controllers;

using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
[Authorize]
public abstract class CrudController<TModel, TDto> : ApiBaseController
{
    private readonly ICrudService<TModel, TDto> _service;
    public CrudController(ICrudService<TModel,TDto> service)
    {
        _service = service;
    }
    [HttpGet]
    public virtual async Task<ICollection<TModel>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        return await _service.GetAllAsync(page, pageSize);
    }
    [HttpGet("{id:int}")]
    public virtual async Task<TModel?> GetModel([FromRoute] int id)
    {
        return await _service.GetByIdAsync(id);
    }
    [HttpPost]
    public virtual async Task<ActionResult<TModel?>> Post([FromBody] TDto request)
    {
        try
        {
            return await _service.CreateAsync(request);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpPut("{id:int}"), Authorize(Roles = "Admin")]
    public virtual async Task<ActionResult<TModel?>> Update([FromRoute] int id, [FromBody] TDto request)
    {
        try
        {
            return await _service.UpdateAsync(id, request);
        } catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
        
    }
    [HttpDelete("{id:int}"), Authorize(Roles = "Admin")]
    public virtual async Task<bool> Delete([FromRoute] int id)
    {
        return await _service.DeleteAsync(id);
    }
}
