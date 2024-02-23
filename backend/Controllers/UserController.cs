using TargoMonitor.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TargoMonitor.Data;
using TargoMonitor.Data.Dtos;
using TargoMonitor.Data.Models;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly TargoMonitorContext _context;
    private readonly TokenService _tokenService;

    public UserController(
        TargoMonitorContext context,
        TokenService tokenService
        )
    {
        _context = context;
        _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        try
        {
            var usernameExists = await _context.Users.AnyAsync(
                u => u.Username == registerDto.Username
            );
            if (usernameExists)
                return BadRequest(new { Message = "This username is already in use." });

            var emailExists = await _context.Users.AnyAsync(u => u.Email == registerDto.Email);
            if (emailExists)
                return BadRequest(new { Message = "This email is already in use." });

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                Password = BC.HashPassword(registerDto.Password)
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

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(
                u => u.Email == loginDto.Email
            );
            if (user == null)
                return NotFound("User not found");
            if (!BC.Verify(loginDto.Password, user.Password))
                return Unauthorized("Wrong password");

            var token = _tokenService.GenerateJwtToken(user);
            return Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            return BadRequest(
                new { Message = "An error occurred during login.", Details = ex.Message }
            );
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound("User not found");
        }
        return Ok(user);
    }
}
