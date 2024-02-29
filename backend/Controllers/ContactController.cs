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
public class ContactController : ControllerBase
{
    private readonly TargoMonitorContext _context;

    public ContactController(TargoMonitorContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> AddContact(AddContactDto addContactDto)
    {
        try
        {
            string userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdFromToken == null)
                return Unauthorized("Invalid user ID");

            if (!int.TryParse(userIdFromToken, out int userId))
                return BadRequest("User ID is not in the correct format.");

            var clientExists = await _context.Clients.AnyAsync(
                c => c.ClientId == addContactDto.ClientId && c.UserId == userId
            );
            if (!clientExists)
                return BadRequest("Client does not exist or does not belong to the user.");

            var contact = new Contact
            {
                ClientId = addContactDto.ClientId,
                Name = addContactDto.Name,
                Position = addContactDto?.Position,
                Phone = addContactDto?.Phone,
                Email = addContactDto?.Email,
                IsPrimary = addContactDto.IsPrimary
            };

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Contact added succesfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{clientId}")]
    public async Task<IActionResult> GetContactsOfClient(int clientId)
    {
        string userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdFromToken == null)
                return Unauthorized("Invalid user ID");

            if (!int.TryParse(userIdFromToken, out int userId))
                return BadRequest("User ID is not in the correct format.");

            var clientExists = await _context.Clients.AnyAsync(
                c => c.ClientId == clientId && c.UserId == userId
            );
            if (!clientExists)
                return BadRequest("Client does not exist or does not belong to the user.");

        var contacts = await _context.Contacts
            .Include(c => c.Client)
            .Where(c => c.Client.UserId == userId)
            .ToListAsync();

        return Ok(contacts);
    }
}
