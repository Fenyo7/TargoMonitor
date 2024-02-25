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
public class ClientController : ControllerBase
{
    private readonly TargoMonitorContext _context;

    public ClientController(TargoMonitorContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> AddClient(AddClientDto addClientDto)
    {
        try
        {
            string userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdFromToken == null)
                return Unauthorized("Invalid user ID");

            if (!int.TryParse(userIdFromToken, out int userId))
                return BadRequest("User ID is not in the correct format.");

            var userExists = await _context.Users.AnyAsync(u => u.UserId == userId);
            if (!userExists)
                return BadRequest("User error");

            var clientExists = await _context.Clients
                .Where(c => c.Name == addClientDto.Name && c.UserId == userId)
                .FirstOrDefaultAsync();
            
            if (clientExists != null)
                return BadRequest("Client already exists");

            var client = new Client
            {
                UserId = userId,
                Name = addClientDto.Name,
                Address = addClientDto.Address,
                HasContract = addClientDto.HasContract,
                DoNotify = addClientDto.HasContract,
                Contacts = new List<Contact>(),
                Machines = new List<Machine>()
            };

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Client added succesfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllClients()
    {
        string userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdFromToken == null)
            return Unauthorized("Invalid user ID");

        if (!int.TryParse(userIdFromToken, out int userId))
            return BadRequest("User ID is not in the correct format.");

        var clients = await _context.Clients.Where(c => c.UserId == userId).ToListAsync();
        return Ok(clients);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetClientById(int id)
    {
        string userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdFromToken == null)
            return Unauthorized("Invalid user ID");

        if (!int.TryParse(userIdFromToken, out int userId))
            return BadRequest("User ID is not in the correct format.");

        var client = await _context.Clients
            .Where(c => c.ClientId == id && c.UserId == userId)
            .FirstOrDefaultAsync();

        if (client == null)
            return NotFound(new { message = "Client not found" });
        return Ok(client);
    }
}
