using System.ComponentModel.DataAnnotations;

namespace TargoMonitor.Data.Models
{
    public class Client
    {
        public int ClientId { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        public string BillingEmail { get; set; }

        // Later this should store the contract itself and it should be openable
        public required bool HasContract { get; set; } = false;

        // public List<int> Pricing { get; set; }
        public required bool DoNotify { get; set; } = true; // Küldjön emailt a cégnek amikor esedékes egy vizsgálat a hónap elején
        public required List<Contact> Contacts { get; set; } = new List<Contact>();
        public required List<Machine> Machines { get; set; } = new List<Machine>();
    }
}
