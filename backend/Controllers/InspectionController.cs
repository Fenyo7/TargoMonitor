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
public class InspectionController : ControllerBase
{
    private readonly TargoMonitorContext _context;

    public InspectionController(TargoMonitorContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> AddInspection(AddInspectionDto addInspectionDto)
    {
        try
        {
            string userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdFromToken == null)
                return Unauthorized("Invalid user ID");

            if (!int.TryParse(userIdFromToken, out int userId))
                return BadRequest("User ID is not in the correct format.");

            var machineExistsForUser = await _context.Machines.AnyAsync(
                m => m.MachineId == addInspectionDto.MachineId && m.Client.UserId == userId
            );

            var inspection = new Inspection 
            { 
                MachineId = addInspectionDto.MachineId,
                Type = addInspectionDto.Type,
                Date = addInspectionDto.Date,
                Notes = addInspectionDto?.Notes
            };

            _context.Inspections.Add(inspection);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Inspection added succesfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
