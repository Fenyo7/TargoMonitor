using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class machineupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Place",
                table: "Machines",
                newName: "VehicleType");

            migrationBuilder.AddColumn<string>(
                name: "AdapterName",
                table: "Machines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressCity",
                table: "Machines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressNumber",
                table: "Machines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AddressStreet",
                table: "Machines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Console",
                table: "Machines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ControlMode",
                table: "Machines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LicenseNumber",
                table: "Machines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Machines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Rope",
                table: "Machines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HoursOfOperation",
                table: "Inspections",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdapterName",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "AddressCity",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "AddressNumber",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "AddressStreet",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "Console",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "ControlMode",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "LicenseNumber",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "Rope",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "HoursOfOperation",
                table: "Inspections");

            migrationBuilder.RenameColumn(
                name: "VehicleType",
                table: "Machines",
                newName: "Place");
        }
    }
}
