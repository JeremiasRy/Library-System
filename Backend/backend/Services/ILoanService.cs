namespace Backend.Services;

using Backend.Models;
using Backend.DTOs;
public interface ILoanService : ICrudService<Loan, LoanDTO>
{
    public Task<ICollection<Loan>> GetExpiredLoansAsync(int? userId, int page = 1, int pageSize = 50);
    public Task<ICollection<Loan>> GetOnGoingLoansAsync(int? userId, int page = 1, int pageSize = 50);
    public Task<ICollection<Loan>> GetLoansByUserAsync(int userId);
}
