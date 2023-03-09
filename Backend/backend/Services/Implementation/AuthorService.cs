namespace Backend.Services;

using Backend.Models;
using Backend.DTOs;
using Backend.Db;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

public class AuthorService : DbCrudService<Author, AuthorDTO>
{
    public AuthorService(AppDbContext dbContext) : base(dbContext)
    {
    }
    public override async Task<Author?> GetByIdAsync(int id)
    {
        return await _dbContext.Authors
            .Include(author => author.Books)
            .FirstAsync(c => c.Id == id);
    }
}
