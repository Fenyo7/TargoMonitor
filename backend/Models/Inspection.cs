using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TargoMonitor.Data.Models
{
    public class Inspection
    {
        public int InspectionId { get; set; }

        [Required]
        [ForeignKey("Machine")]
        public int MachineId { get; set; }
        public virtual Machine Machine { get; set; } // Navigation Property to Machine

        [Required]
        public string Type { get; set; } // Vizsgálat típusa (IBF, Fővizsgálat, Szerk)

        [Required]
        public DateTime Date { get; set; } // Időpont
        public string HoursOfOperation { get; set; } // Üzemóra
        public string Notes { get; set; } // Megjegyzés
    }
}
