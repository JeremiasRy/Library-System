using Backend.Models;
using System.Net.Mime;

namespace Backend.Db;

public class DatabaseTestFixture
{
    private static readonly object _lock = new();
    private static bool _dbInitialized;
    private static IDictionary<string, string> _config = new Dictionary<string, string>()
    {
        { "ConnectionStrings:Default", "Host=localhost;Username=postgres;Password=jeremias;Database=library_test" }
    };

    readonly IConfiguration configuration = new ConfigurationBuilder()
        .AddInMemoryCollection(_config) 
        .Build();


    public DatabaseTestFixture()
    {
        lock (_lock)
        {
            if (!_dbInitialized)
            {
                using (var context = CreateContext())
                {
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();
                    context.Add(new Book() { Title = "Test" });
                    context.Add(new Book() { Title = "Test2" });
                    context.SaveChanges();
                }

                _dbInitialized = true;
            }
        }
    }

    public AppDbContext CreateContext()
        => new(configuration);
}
