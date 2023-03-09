namespace Backend.Controllers;

using Backend.Models;
using Backend.DTOs;
using Backend.Services;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

public class CopyController : CrudController<Copy, CopyDTO>
{
    public CopyController(ICrudService<Copy, CopyDTO> service) : base(service)
    {
    }
}
