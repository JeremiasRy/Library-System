namespace Backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;

[Authorize]
public class LoanController : ApiBaseController
{
    private readonly ILoanService _loanService;
    public LoanController(ILoanService loanService) => _loanService = loanService;
    
    [HttpGet, Authorize(Roles = "Admin")]
    public async Task<ICollection<LoanResponseDTO>> GetAll([FromQuery] FilterOptions? filter, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        ICollection<Loan> loans = new List<Loan>();
        if (filter is not null)
        {
            loans = filter == FilterOptions.Expired 
                ? await _loanService.GetExpiredLoansAsync(page, pageSize) 
                : await _loanService.GetOnGoingLoansAsync(page, pageSize);

            return loans.Select(loan => LoanResponseDTO.FromLoan(loan)).ToList();
        }
        loans = await _loanService.GetAllAsync(page, pageSize);
        return loans.Select(loan => LoanResponseDTO.FromLoan(loan)).ToList();
    }
    [HttpGet("{id:int}"), Authorize(Roles = "Admin")]
    public async Task<Loan?> Get([FromRoute] int id)
    {
        return await _loanService.GetByIdAsync(id);
    }
    [HttpGet("user/{id:int}"), Authorize(Roles = "Admin,Customer")]
    public async Task<ICollection<Loan>?> GetByUser([FromRoute] int id)
    {
        return await _loanService.GetLoansByUserAsync(id);
    }
    [HttpPost, Authorize(Roles = "Admin,Customer")]
    public async Task<ICollection<LoanResponseDTO>?> MakeLoans([FromBody] MakeLoansDTO request)
    {
        var loans = await _loanService.CreateAsync(request);
        if (loans == null)
        {
            return null;
        }
        return loans.Select(loan => LoanResponseDTO.FromLoan(loan)).ToList();
    }
    [HttpPut("{id:int}"), Authorize(Roles = "Admin,Customer")]
    public async Task<Loan?> UpdateLoan([FromRoute] int id, [FromBody] UpdateLoanDTO request)
    {
        return await _loanService.UpdateAsync(id, request);
    }
    public enum FilterOptions
    {
        Expired,
        OnGoing
    }
}
