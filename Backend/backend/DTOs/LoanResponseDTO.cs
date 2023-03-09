namespace Backend.DTOs;

using Backend.Models;

public class LoanResponseDTO
{
    public int Id { get; set; }
    public UserResponseDTO User { get; set; } = null!;
    public Copy Copy { get; set; } = null!;
    public DateTime LoanedAt { get; set; }
    public DateTime DueDate { get; set; }
    public bool Returned { get; set; }

    public static LoanResponseDTO FromLoan(Loan loan)
    {
        return new LoanResponseDTO()
        {
            Id = loan.Id,
            User = UserResponseDTO.FromUser(loan.User),
            Copy = loan.Copy,
            LoanedAt = loan.LoanedAt,
            DueDate = loan.DueDate,
            Returned = loan.Returned,
        };
    }
}
