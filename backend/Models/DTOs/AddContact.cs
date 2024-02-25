using System.ComponentModel.DataAnnotations;

namespace TargoMonitor.Data.Dtos
{
    public class AddContactDto
    {
        [Required]
        public int ClientId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Position { get; set; }
        public string Phone {get;set;}
        public string Email {get;set;}
    }
}
