using Backend.Models;

namespace Backend.DTOs;

public class LoanDTO : BaseDTO<Loan>
{
    public int UserId { get; set; }
    public int CopyId { get; set; }
    public DateTime DueDate { get; set; }
    public bool Returned { get; set; }

    public override void UpdateModel(Loan model)
    {
        model.DueDate = DueDate;
        model.Returned = Returned;
    }
}
