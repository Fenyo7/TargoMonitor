using System.ComponentModel.DataAnnotations.Schema;

public class Machine
{
    public int MachineId { get; set; }

    [ForeignKey("Client")]
    public int ClientId { get; set; }
    public Client Client { get; set; } // Navigation Property to Client
    public List<Inspection> Inspections { get; set; } = new List<Inspection>();
    public string Place { get; set; } // Üzemeltetési hely
    public bool IsLifting { get; set; } // Emelőgép-e
    public int? InventoryNumber { get; set; } // Leltári szám
    public string Kind { get; set; } // Besorolás (Legördülős menü, rendszámként lesz eltárolva)
    public string Name { get; set; } // Név
    public string Propulsion { get; set; } // Meghajtás
    public string Brand { get; set; } // Gyártmány
    public string Type { get; set; } // Típus
    public string FactoryNumber { get; set; } // Gyári szám
    public string ManufactureYear { get; set; } // Gyártási év
    public DateTime? CommissionDate {get; set;} // Üzembe helyezés időponja

    // ### Adattábla szerinti adatok ###

    public string Load { get; set; } // Teherbírás (kg)
    public string LiftHeight { get; set; } // Emelési magasság (mm)
    public string Span { get; set; } // Konzol kinyúlás / fesztáv (m)
    public string Power { get; set; } // Teljesítmény (kW)
    public string Weight { get; set; } // Önsúly (kg)
    public string Chain { get; set; } // Lánc / kötél típus
    public string Bend { get; set; } // Megengedett lehajlás
}
