using Backend.Controllers;
using Backend.Db;
using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryBackendTests
{
    public class BookControllerTest : IClassFixture<DatabaseTestFixture>
    {
        public DatabaseTestFixture Fixture;
        public BookControllerTest(DatabaseTestFixture fixture)
        {

            Fixture = fixture;
        }
        [Fact]
        public async Task InitializedBooks()
        {
            var controller = new BookController(new BookService(Fixture.CreateContext()));
            var books = await controller.GetAll();
            Assert.True(books.Count == 2);
        }
        [Fact]
        public async Task AddBook()
        {
            var context = Fixture.CreateContext();
            context.Database.BeginTransaction();
            var controller = new BookController(new BookService(context));
            await controller.Post(new BookDTO { Title = "Test Book 3" });

            context.ChangeTracker.Clear();

            var books = await controller.GetAll();
            Assert.True(books.Count == 3);

            var shouldBeBadResult = await controller.Post(new BookDTO { Title = "Test Book 3" });
            Assert.True(shouldBeBadResult.Result is BadRequestObjectResult);
            context.ChangeTracker.Clear();

            await controller.Post(new BookDTO { Title = "Test Book 4" });
            context.ChangeTracker.Clear();

            books = await controller.GetAll();
            Assert.True(books.Count == 4);
        }
        [Fact]
        public async Task UpdateBook()
        {
            var context = Fixture.CreateContext();
            var controller = new BookController(new BookService(context));
            var books = await controller.GetAll();
            await controller.Update((int)books?.FirstOrDefault()?.Id, new BookDTO { Title = "Item has been changed" });
            context.ChangeTracker.Clear();
            books = await controller.GetBooksByFilter(null, null, "Item", null);
            Assert.True(books?.FirstOrDefault()?.Title == "Item has been changed");
        }
        [Fact]
        public async Task DeleteBook()
        {
            var context = Fixture.CreateContext();
            context.Database.BeginTransaction();
            var controller = new BookController(new BookService(context));
            await controller.Delete(1);
            context.ChangeTracker.Clear();
            var books = await controller.GetAll();
            Assert.True(books.Count == 1);
        }
    }
}