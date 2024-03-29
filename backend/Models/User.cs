using System.ComponentModel.DataAnnotations;

namespace TargoMonitor.Data.Models
{
    public class User
    {
        public int UserId { get; set; }

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

        public List<Client> Clients { get; set; }
    }
}
