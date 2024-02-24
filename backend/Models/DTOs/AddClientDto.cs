using System.ComponentModel.DataAnnotations;

namespace TargoMonitor.Data.Dtos
{
    public class AddClientDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        public bool HasContract = false;
        public bool DoNotify = true;
    }
}
