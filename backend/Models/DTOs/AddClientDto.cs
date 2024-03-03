using System.ComponentModel.DataAnnotations;

namespace TargoMonitor.Data.Dtos
{
    public class AddClientDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public bool HasContract { get; set; }

        [Required]
        public bool DoNotify { get; set; }

        [Required]
        public string BillingEmail { get; set; }
    }
}
