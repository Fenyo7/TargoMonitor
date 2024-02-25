using System.ComponentModel.DataAnnotations;

namespace TargoMonitor.Data.Dtos
{
    public class AddMachineDto
    {
        [Required]
        public int ClientId {get; set;}
        public string Place { get; set; } // Telephely / Üzemeltetés telephelye (Város)
        public string UsePlace { get; set; } // Üzemelés helye (Raktár pl.)
        public bool IsLifting { get; set; } = true; // Emelőgép-e
        public int? InventoryNumber { get; set; } // Leltári szám
        [Required]
        public string Kind { get; set; } // Besorolás (Legördülős menü, kódként lesz eltárolva)
        public string Name { get; set; } // Név
        public string Brand { get; set; } // Gyártmány
        public string Type { get; set; } // Típus
        public string FactoryNumber { get; set; } // Gyári szám
        public string ManufactureYear { get; set; } // Gyártási év
        public DateTime? CommissionDate { get; set; } // Üzembe helyezés időponja

        // ### Adattábla szerinti adatok ###

        public string Load { get; set; } // Teherbírás (kg)
        public string LiftHeight { get; set; } // Emelési magasság (mm)
        public string Span { get; set; } // Konzol kinyúlás / fesztáv (m)
        public string Power { get; set; } // Teljesítmény (kW)
        public string Weight { get; set; } // Önsúly (kg)
        public string Chain { get; set; } // Lánc / kötél típus
        public string Bend { get; set; } // Megengedett lehajlás
    }
}
