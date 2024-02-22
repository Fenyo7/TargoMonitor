using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TargoMonitor.Data.Models;

namespace TargoMonitor.Data
{
    public class TargoMonitorContext : DbContext
    {
        public TargoMonitorContext(DbContextOptions<TargoMonitorContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Machine> Machines { get; set; }
        public DbSet<Inspection> Inspections { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<User>()
                .HasMany(u => u.Clients)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId);

            modelBuilder
                .Entity<Client>()
                .HasMany(c => c.Machines)
                .WithOne(m => m.Client)
                .HasForeignKey(m => m.ClientId);

            modelBuilder
                .Entity<Machine>()
                .HasMany(m => m.Inspections)
                .WithOne(i => i.Machine)
                .HasForeignKey(i => i.MachineId);

            modelBuilder
                .Entity<Client>()
                .HasMany(c => c.Contacts)
                .WithOne(co => co.Client)
                .HasForeignKey(co => co.ClientId);
        }
    }
}
