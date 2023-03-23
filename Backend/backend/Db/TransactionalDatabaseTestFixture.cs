using Backend.Models;

namespace Backend.Db;

public class TransactionalDatabaseTestFixture
{
    private static IDictionary<string, string> _config = new Dictionary<string, string>()
    {
        { "ConnectionStrings:Default", "Host=localhost;Username=postgres;Password=jeremias;Database=library_test_transaction" }
    };

    public AppDbContext CreateContext()
        => new(new ConfigurationBuilder().AddInMemoryCollection(_config).Build());

    public TransactionalDatabaseTestFixture()
    {
        using var context = CreateContext();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        CleanUp();
    }
    public void CleanUp()
    {
        using var context = CreateContext();
        context.Books.RemoveRange(context.Books);
        context.Books.AddRange(
            new Book() { Title = "Test" }, 
            new Book() { Title= "Test2"}
            );
        context.SaveChanges();
    }
}
