using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TargoMonitor.Data;
using TargoMonitor.Data.Dtos;
using TargoMonitor.Data.Models;
using BCrypt;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly TargoMonitorContext _context;

    public UserController(TargoMonitorContext context)
    {
        _context = context;
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        try
        {
            var usernameExists = await _context.Users.AnyAsync(
                u => u.Username == registerDto.Username
            );
            if (usernameExists)
                return BadRequest("Username is taken");

            var emailExists = await _context.Users.AnyAsync(u => u.Email == registerDto.Email);
            if (emailExists)
                return BadRequest("Email is already registered");

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Registration successful" });
        }
        catch (Exception ex)
        {
            return BadRequest(
                new { Message = "An error occurred during registration.", Details = ex.Message }
            );
        }
    }
}
