using System.ComponentModel.DataAnnotations.Schema;

namespace TargoMonitor.Data.Models
{
    public class Machine
    {
        public int MachineId { get; set; }

        [ForeignKey("Client")]
        public int ClientId { get; set; }
        public virtual Client Client { get; set; } // Navigation Property to Client
        public List<Inspection> Inspections { get; set; } = new List<Inspection>();
        public string AddressCity { get; set; } // Telephely (Város)
        public string AddressStreet { get; set; } // Telephely (Utca)
        public string AddressNumber { get; set; } // Telephely (Házszám)
        public string UsePlace { get; set; } // Üzemelés helye (Raktár pl.)
        public bool isDangerous { get; set; } // Veszélyes gép-e
        public bool IsLifting { get; set; } // Emelőgép-e
        public int? InventoryNumber { get; set; } // Leltári szám
        public string Kind { get; set; } // Besorolás (Legördülős menü, kódként lesz eltárolva)
        public string Name { get; set; } // Név generálva besorolásból
        public string Brand { get; set; } // Gyártmány
        public string Type { get; set; } // Típus
        public string FactoryNumber { get; set; } // Gyári szám
        public string ManufactureYear { get; set; } // Gyártási év
        public DateTime? CommissionDate { get; set; } // Üzembe helyezés időponja
        public string Note { get; set; } // Megjegyzés

        // ### Adattábla szerinti adatok ###

        public string LicenseNumber { get; set; }    // Rendszám
        public string AdapterName { get; set; }     // Adapter megnevezése
        public string ControlMode { get; set; }    // Vezérlés módja : talajról, rádió, egyéb
        public string VehicleType { get; set; }   // Jármű típusa (mire szerelték az emelőgépet)
        public string LiftHeight { get; set; }   // Emelési magasság (mm)
        public string Console { get; set; }     // Konzol kinyúlás
        public string Weight { get; set; }     // Önsúly (kg)
        public string Power { get; set; }     // Teljesítmény (kW)
        public string Chain { get; set; }    // Lánc
        public string Load { get; set; }    // Teherbírás (kg)
        public string Span { get; set; }   // fesztáv (m)
        public string Rope { get; set; }  // kötél típus
        public string Bend { get; set; } // Megengedett lehajlás
    }
}
