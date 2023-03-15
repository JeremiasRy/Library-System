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
    private readonly IJwtTokenService _jwtTokenService;
    public LoanController(ILoanService loanService, IJwtTokenService jwtTokenService)
    {
        _loanService = loanService;
        _jwtTokenService = jwtTokenService;
    }
    
    [HttpGet, Authorize(Roles = "Admin")]
    public async Task<ICollection<LoanResponseDTO>> GetAll([FromQuery] FilterOptions? filter, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        ICollection<Loan> loans = new List<Loan>();
        if (filter is not null)
        {
            loans = filter == FilterOptions.Expired 
                ? await _loanService.GetExpiredLoansAsync(null, page, pageSize) 
                : await _loanService.GetOnGoingLoansAsync(null, page, pageSize);

            return loans.Select(loan => LoanResponseDTO.FromLoan(loan)).ToList();
        }
        loans = await _loanService.GetAllAsync(page, pageSize);
        return loans.Select(loan => LoanResponseDTO.FromLoan(loan)).ToList();
    }
    [HttpGet("{id:int}"), Authorize(Roles = "Admin,Customer")]
    public async Task<Loan?> Get([FromRoute] int id)
    {
        return await _loanService.GetByIdAsync(id);
    }
    [HttpGet("user/{id:int}"), Authorize(Roles = "Admin,Customer")]
    public async Task<ICollection<LoanResponseDTO>?> GetByUser([FromRoute] int id, [FromQuery] FilterOptions? filter, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        Request.Headers.TryGetValue("Authorization", out var token);
        var jwtToken = _jwtTokenService.ReadToken(token[0].Replace("Bearer ", string.Empty));
        if (int.TryParse(jwtToken.Subject, out int userId))
        {
            if (userId != id)
            {
                return null;
            }
        }
        ICollection<Loan> loans = new List<Loan>();
        if (filter is not null)
        {
            loans = filter == FilterOptions.Expired
                ? await _loanService.GetExpiredLoansAsync(id, page, pageSize)
                : await _loanService.GetOnGoingLoansAsync(id, page, pageSize);

            return loans.Select(loan => LoanResponseDTO.FromLoan(loan)).ToList();
        }
        loans = await _loanService.GetLoansByUserAsync(id);
        return loans.Select(loan => LoanResponseDTO.FromLoan(loan)).ToList();
    }
    [HttpPost, Authorize(Roles = "Admin,Customer")]
    public async Task<ICollection<LoanResponseDTO>?> MakeLoans([FromBody] MakeLoanDTO request)
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
