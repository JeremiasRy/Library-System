using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class Remove : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "book_publisher");

            migrationBuilder.AddColumn<int>(
                name: "publisher_id",
                table: "books",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_books_publisher_id",
                table: "books",
                column: "publisher_id");

            migrationBuilder.AddForeignKey(
                name: "fk_books_publishers_publisher_id",
                table: "books",
                column: "publisher_id",
                principalTable: "publishers",
                principalColumn: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_books_publishers_publisher_id",
                table: "books");

            migrationBuilder.DropIndex(
                name: "ix_books_publisher_id",
                table: "books");

            migrationBuilder.DropColumn(
                name: "publisher_id",
                table: "books");

            migrationBuilder.CreateTable(
                name: "book_publisher",
                columns: table => new
                {
                    books_id = table.Column<int>(type: "integer", nullable: false),
                    publishers_id = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_book_publisher", x => new { x.books_id, x.publishers_id });
                    table.ForeignKey(
                        name: "fk_book_publisher_books_books_id",
                        column: x => x.books_id,
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_book_publisher_publishers_publishers_id",
                        column: x => x.publishers_id,
                        principalTable: "publishers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_book_publisher_publishers_id",
                table: "book_publisher",
                column: "publishers_id");
        }
    }
}
