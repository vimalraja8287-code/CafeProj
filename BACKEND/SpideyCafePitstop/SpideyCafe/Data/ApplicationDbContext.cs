using Microsoft.EntityFrameworkCore;
using SpideyCafe.Models;

namespace SpideyCafe.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options): base(options)
        {
            
        }


        public DbSet<CafeTable> cafeTables { get; set; }
        public DbSet<MenuItems> menuItems { get; set; }

        public DbSet<Order> orders { get; set; }

        public DbSet<OrderItem> orderItems { get; set; }
    }
}
