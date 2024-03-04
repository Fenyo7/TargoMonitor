using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public async Task<IActionResult> AddMachine(AddMachineDto addMachineDto)
    {
        try
        {
            string userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdFromToken == null)
                return Unauthorized("Invalid user ID");

            if (!int.TryParse(userIdFromToken, out int userId))
                return BadRequest("User ID is not in the correct format.");

            var clientExists = await _context.Clients.AnyAsync(
                c => c.ClientId == addMachineDto.ClientId && c.UserId == userId
            );
            if (!clientExists)
                return BadRequest("Client does not exist or does not belong to the user.");

            var machine = new Machine
            {
                ClientId = addMachineDto.ClientId,
                AddressCity = addMachineDto.AddressCity,
                AddressStreet = addMachineDto.AddressStreet,
                AddressNumber = addMachineDto.AddressNumber,
                UsePlace = addMachineDto?.UsePlace,
                isDangerous = addMachineDto.isDangerous,
                IsLifting = addMachineDto.IsLifting,
                InventoryNumber = addMachineDto.InventoryNumber,
                Kind = addMachineDto.Kind,
                Name = addMachineDto.Name,
                Brand = addMachineDto.Brand,
                Type = addMachineDto.Type,
                FactoryNumber = addMachineDto.FactoryNumber,
                ManufactureYear = addMachineDto.ManufactureYear,
                CommissionDate = addMachineDto?.CommissionDate,
                
                // ### Adattábla szerinti adatok ###

                LicenseNumber = addMachineDto?.LicenseNumber,
                AdapterName = addMachineDto?.AdapterName,
                ControlMode = addMachineDto?.ControlMode,
                LiftHeight = addMachineDto?.LiftHeight,
                RopeDiam = addMachineDto?.RopeDiam,
                Console = addMachineDto?.Console,
                Weight = addMachineDto?.Weight,
                Power = addMachineDto?.Power,
                Chain = addMachineDto?.Chain,
                Load = addMachineDto?.Load,
                Span = addMachineDto?.Span,
                Rope = addMachineDto?.Rope,
                Bend = addMachineDto?.Bend
            };

            _context.Machines.Add(machine);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Machine added succesfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllMachines()
    {
        string userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdFromToken == null)
        {
            return Unauthorized("Invalid user ID");
        }

        if (!int.TryParse(userIdFromToken, out int userId))
        {
            return BadRequest("User ID is not in the correct format.");
        }

        var clientExists = await _context.Clients.AnyAsync(c => c.UserId == userId);
        if (!clientExists)
        {
            return BadRequest("Client does not exist or does not belong to the user.");
        }

        var machines = await _context.Machines
            .Include(m => m.Client)
            .Where(m => m.Client.UserId == userId)
            .ToListAsync();

        return Ok(machines);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMachineById(int id)
    {
        string userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdFromToken == null)
        {
            return Unauthorized("Invalid user ID");
        }

        if (!int.TryParse(userIdFromToken, out int userId))
        {
            return BadRequest("User ID is not in the correct format.");
        }

        var machine = await _context.Machines
            .Include(m => m.Client)
            .SingleOrDefaultAsync(m => m.MachineId == id && m.Client.UserId == userId);

        if (machine == null)
        {
            return NotFound("Machine not found or access is not permitted.");
        }

        return Ok(machine);
    }
}
