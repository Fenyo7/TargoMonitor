using System.ComponentModel.DataAnnotations.Schema;

namespace TargoMonitor.Data.Models
{
    public class Inspection
    {
        public int InspectionId { get; set; }

        [ForeignKey("Machine")]
        public int MachineId { get; set; }
        public virtual Machine Machine { get; set; } // Navigation Property to Machine
        public required string Type { get; set; } // Vizsgálat típusa (IBF, Fővizsgálat, Szerk)
        public required DateTime Date { get; set; } // Időpont
        public string Notes { get; set; } // Megjegyzés
    }
}
