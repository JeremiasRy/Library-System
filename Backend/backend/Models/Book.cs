﻿namespace Backend.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Book : BaseModel
{
    [MinLength(2)]
    [MaxLength(50)]
    public string Title { get; set; } = null!;
    [MaxLength(256)]
    public string? Description { get; set; }
    public ICollection<Category> Categories { get; set; } = null!;
    public ICollection<Author> Authors { get; set; } = null!;  
    public ICollection<Copy> Copies { get; set; } = null!;
    [NotMapped]
    public ICollection<Publisher>? Publishers { get => Copies?.Select(c => c.Publisher).Distinct().ToList(); }
    [NotMapped]
    public int CopiesAvailable { get => Copies == null ? 0 : Copies.Where(copy => copy.IsAvailable).Count(); }
}
