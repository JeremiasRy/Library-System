using Backend.Controllers;
using Backend.Db;
using Backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LibraryBackendTests;

[CollectionDefinition("TransactionalTests")]
public class BookControllerTransactionalTestsCollection : ICollectionFixture<TransactionalDatabaseTestFixture>
{
}

[Collection("TransactionalTests")]
public class BookControllerTransactionalTests : IDisposable
{
    public TransactionalDatabaseTestFixture Fixture { get; }
    public BookControllerTransactionalTests(TransactionalDatabaseTestFixture fixture)
    {
        Fixture = fixture;
    }

    public void Dispose()
    {
        Fixture.CleanUp();
    }
    [Fact]
    public async Task UpdateBook()
    {
        var controller = new BookController(new BookService(Fixture.CreateContext()));
        var books = await controller.GetAll();
        await controller.Update(books.First().Id, new Backend.DTOs.BookDTO() { Title = "Item has been changed" });
        var book = await controller.GetBooksByFilter(null, null, "Item", null);
        Assert.True(book?.First().Title == "Item has been changed");
    }
}

