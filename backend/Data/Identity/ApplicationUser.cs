using Microsoft.AspNetCore.Identity;

namespace TargoMonitor.Data 
{
    public class ApplicationUser : IdentityUser
    {
        public string Schema { get; set; }
    }
}