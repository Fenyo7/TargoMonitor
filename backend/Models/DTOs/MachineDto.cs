namespace TargoMonitor.Data.DTOs
{
    public class MachineDto
    {
        public int MachineId { get; set; }
        public int ClientId { get; set; } // Include if you need to reference back to the Client
        public string ClientName { get; set; }

        public string AddressCity { get; set; } // Telephely (Város)
        public string AddressStreet { get; set; } // Telephely (Utca)
        public string UsePlace { get; set; } // Üzemelés helye (Raktár pl.)

        public bool IsDangerous { get; set; } // Veszélyes gép-e
        public bool IsLifting { get; set; } // Emelőgép-e

        public int InspectGroupNumber { get; set; } // Vizsgálati csoportszám
        public int InventoryNumber { get; set; } // Leltári szám

        public string Kind { get; set; } // Besorolás
        public string Name { get; set; } // Név

        public string Brand { get; set; } // Gyártmány
        public string Type { get; set; } // Típus
        public string FactoryNumber { get; set; } // Gyári szám

        public string ManufactureYear { get; set; } // Gyártási év
        public DateTime? CommissionDate { get; set; } // Üzembe helyezés időponja
        public string Note { get; set; } // Megjegyzés

        // ### Adattábla szerinti adatok ###
        public string LicenseNumber { get; set; }
        public string AdapterName { get; set; }
        public string ControlMode { get; set; }
        public string VehicleType { get; set; }
        public string LiftHeight { get; set; }
        public string RopeDiam { get; set; }
        public string Console { get; set; }
        public string Weight { get; set; }
        public string Power { get; set; }
        public string Chain { get; set; }
        public string Load { get; set; }
        public string Span { get; set; }
        public string Rope { get; set; }
        public string Bend { get; set; }
    }
}
