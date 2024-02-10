using System.ComponentModel.DataAnnotations.Schema;

public class Inspection
{
    public int InspectionId { get; set; }

    [ForeignKey("Machine")]
    public int MachineId { get; set; }
    public Machine Machine { get; set; }
    public required string Type { get; set; } // Vizsgálat típusa (IBF, Fővizsgálat, Szerk)
    public required DateTime Date { get; set; } // Időpont
    public string Notes { get; set; } // Megjegyzés
}
