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
            int userId = int.Parse(userIdFromToken);

            var clientNameExists = await _context.Clients.AnyAsync(
                c => c.Name == addClientDto.Name
            );
            if (clientNameExists)
                return BadRequest("Client name is taken");

            var userExists = await _context.Users.AnyAsync(u => u.UserId == userId);
            if (!userExists)
                return BadRequest("User error");

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
}
