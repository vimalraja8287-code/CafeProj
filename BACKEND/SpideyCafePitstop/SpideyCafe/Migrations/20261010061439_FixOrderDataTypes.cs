using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpideyCafe.Migrations
{
    /// <inheritdoc />
    public partial class FixOrderDataTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "TotalAmount",
                table: "orders",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MenuItemsMenuItemId",
                table: "orderItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_orderItems_MenuItemsMenuItemId",
                table: "orderItems",
                column: "MenuItemsMenuItemId");

            migrationBuilder.CreateIndex(
                name: "IX_orderItems_OrderID",
                table: "orderItems",
                column: "OrderID");

            migrationBuilder.AddForeignKey(
                name: "FK_orderItems_menuItems_MenuItemsMenuItemId",
                table: "orderItems",
                column: "MenuItemsMenuItemId",
                principalTable: "menuItems",
                principalColumn: "MenuItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_orderItems_orders_OrderID",
                table: "orderItems",
                column: "OrderID",
                principalTable: "orders",
                principalColumn: "OrderID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orderItems_menuItems_MenuItemsMenuItemId",
                table: "orderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_orderItems_orders_OrderID",
                table: "orderItems");

            migrationBuilder.DropIndex(
                name: "IX_orderItems_MenuItemsMenuItemId",
                table: "orderItems");

            migrationBuilder.DropIndex(
                name: "IX_orderItems_OrderID",
                table: "orderItems");

            migrationBuilder.DropColumn(
                name: "MenuItemsMenuItemId",
                table: "orderItems");

            migrationBuilder.AlterColumn<string>(
                name: "TotalAmount",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "orders",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
