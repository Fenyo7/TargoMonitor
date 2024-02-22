using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace TargoMonitor.Data.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(
            100,
            MinimumLength = 6,
            ErrorMessage = "Password must be between 6 and 100 characters long."
        )]
        public string Password { get; set; }
    }
}
