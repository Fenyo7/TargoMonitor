public class Client
{
    public int ClientId { get; set; }
    public required string Name { get; set; }
    public required string Address { get; set; }
    public required List<Contact> Contacts { get; set; } = new List<Contact>();

    // Later this should store the contract itself and it should be openable
    public required bool HasContract { get; set; } = false;
    public List<int>? Pricing { get; set; }
    public required List<Machine> Machines { get; set; } = new List<Machine>();
}
