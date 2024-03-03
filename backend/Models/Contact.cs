using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TargoMonitor.Data.Models
{
    public class Contact
    {
        public int ContactId { get; set; }

        [ForeignKey("Client")]
        [Required]
        public int ClientId { get; set; }
        public virtual Client Client { get; set; } // Navigation property to Client

        [Required]
        public string Name { get; set; }
        public string Position { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public bool IsPrimary { get; set; } // Elsődleges kontakt? (akkor meg lesz jelenítve)
    }
}
