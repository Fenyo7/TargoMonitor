using System.ComponentModel.DataAnnotations;

namespace TargoMonitor.Data.Dtos
{
    public class AddInspectionDto
    {
        [Required]
        public int MachineId { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public string Notes {get;set;}
    }
}
