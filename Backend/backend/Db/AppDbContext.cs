﻿namespace Backend.Db;

using Microsoft.EntityFrameworkCore;
using Npgsql;
using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

public class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    private readonly IConfiguration _configuration;
    public AppDbContext(IConfiguration configuration) => _configuration = configuration;
    static AppDbContext()
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var connectionSting = _configuration.GetConnectionString("Default");
        
        options
            .UseNpgsql(connectionSting)
            .AddInterceptors(new AppDbContextSaveChangesInterceptors())
            .UseSnakeCaseNamingConvention();
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.AddUserConfig();
        modelBuilder.AddTimestampConfig();
        modelBuilder.AddBookConfig();
        modelBuilder.AddLoanConfig();
        modelBuilder.AddPublisherConfig();
        modelBuilder.AddAuthorConfig();
        modelBuilder.AddCopyConfig();
    }

    public DbSet<Book> Books { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Author> Authors { get; set; } = null!;
    public DbSet<Publisher> Publishers { get; set; } = null!;
    public DbSet<Loan> Loans { get; set; } = null!;
    public DbSet<Copy> Copies { get; set; } = null!;
}
