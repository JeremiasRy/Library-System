namespace Backend.Services;

using Backend.Models;
using Backend.DTOs;
using Backend.Db;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class LoanService : ILoanService
{
    private readonly AppDbContext _dbContext;
    public LoanService(AppDbContext dbContext) 
    {
        _dbContext = dbContext;
    }

    public async Task<ICollection<Loan>?> CreateAsync(MakeLoanDTO request)
    {
        var user = await _dbContext.Users.SingleOrDefaultAsync(user => user.Id == request.UserId);

        if (user is null)
        {
            return null;
        }

        var copy = await _dbContext.Copies.SingleOrDefaultAsync(copy => copy.Id == request.CopyId);
        
        if (copy is null)
        {
            return null;
        }
        copy.IsAvailable = false;

        var loan = new Loan()
            {
                CopyId = copy.Id,
                UserId = user.Id,
                LoanedAt = DateTime.Now,
                DueDate = DateTime.Now.AddMonths(1)
            };

        _dbContext.Loans.Add(loan);

        await _dbContext.SaveChangesAsync();

        return await _dbContext.Loans
            .AsNoTracking()
            .Where(loan => loan.UserId == request.UserId)
            .ToListAsync();
    }

    public async Task<ICollection<Loan>> GetAllAsync(int page = 1, int pageSize = 50)
    {
        return await _dbContext.Loans
            .AsNoTracking()
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<Loan?> GetByIdAsync(int id)
    {
        return await _dbContext.FindAsync<Loan>(id);
    }

    public async Task<ICollection<Loan>> GetExpiredLoansAsync(int? userId,int page = 1, int pageSize = 50)
    {
        return await _dbContext.Loans
            .AsNoTracking()
            .Where(loan => DateTime.Now > loan.DueDate)
            .Where(loan => userId == null ? true : loan.UserId == userId)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<ICollection<Loan>> GetLoansByUserAsync(int userId)
    {
        return await _dbContext.Loans
            .AsNoTracking()
            .Where(loan => loan.UserId == userId)
            .ToListAsync();
    }

    public async Task<ICollection<Loan>> GetOnGoingLoansAsync(int? userId, int page = 1, int pageSize = 50)
    {
        return await _dbContext.Loans
            .AsNoTracking()
            .Where(loan => !loan.Returned)
            .Where(loan => userId == null ? true : loan.UserId == userId)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<Loan?> UpdateAsync(int id, UpdateLoanDTO request)
    {
        var loan = await _dbContext.Loans.SingleOrDefaultAsync(loan => loan.Id == id);
        
        if (loan == null)
        {
            return null;
        }
        if (loan.UserId != request.UserId)
        {
            return null;
        }
        if (request.Returned)
        {
            var copy = await _dbContext.Copies.SingleOrDefaultAsync(copy => copy.Id == loan.CopyId);
            if (copy is not  null)
            {
                copy.IsAvailable = true;
            }
        }

        request.UpdateModel(loan);
        await _dbContext.SaveChangesAsync();
        return loan;
    }
}
