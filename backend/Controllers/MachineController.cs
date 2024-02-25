using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TargoMonitor.Data;
using TargoMonitor.Data.Dtos;
using TargoMonitor.Data.Models;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MachineController : ControllerBase
{
    private readonly TargoMonitorContext _context;

    public MachineController(TargoMonitorContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> AddContact(AddMachineDto addMachineDto)
    {
        try
        {
            string userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdFromToken == null)
                return Unauthorized("Invalid user ID");

            if (!int.TryParse(userIdFromToken, out int userId))
                return BadRequest("User ID is not in the correct format.");

            var client = await _context.Clients.FindAsync(addMachineDto.ClientId);
            if(client == null) return BadRequest("Corresponding client does not exist.");

            if(client.UserId != userId) return Unauthorized("Invalid token");

            var machine = new Machine
            {
                ClientId = addMachineDto.ClientId,
                Place = addMachineDto?.Place,
                UsePlace = addMachineDto?.UsePlace,
                IsLifting = addMachineDto.IsLifting,
                InventoryNumber = addMachineDto?.InventoryNumber,
                Kind = addMachineDto.Kind,
                Name = addMachineDto?.Name,
                Brand = addMachineDto?.Brand,
                Type = addMachineDto?.Type,
                FactoryNumber = addMachineDto?.FactoryNumber,
                ManufactureYear = addMachineDto?.ManufactureYear,
                CommissionDate = addMachineDto?.CommissionDate,

                // ### Adattábla szerinti adatok ###

                Load = addMachineDto?.Load,
                LiftHeight = addMachineDto?.Load,
                Span = addMachineDto?.Span,
                Power = addMachineDto?.Power,
                Weight = addMachineDto?.Weight,
                Chain = addMachineDto?.Chain,
                Bend = addMachineDto?.Bend
            };

            _context.Machines.Add(machine);
            await _context.SaveChangesAsync();

            return Ok(new {Message = "Machine added succesfully."});
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}