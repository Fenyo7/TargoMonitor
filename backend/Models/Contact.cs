using System.ComponentModel.DataAnnotations.Schema;

namespace TargoMonitor.Data.Models
{
    public class Contact
    {
        public int Id { get; set; }

        [ForeignKey("Client")]
        public int ClientId { get; set; }
        public virtual Client Client { get; set; } // Navigation property to Client
        public string Name { get; set; }
        public string Position { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
