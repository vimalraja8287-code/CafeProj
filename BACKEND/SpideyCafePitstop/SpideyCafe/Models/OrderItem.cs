using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace SpideyCafe.Models
{
    public class OrderItem
    {
        [Key]
        public int OrderItemID { get; set; } 

        public int OrderID { get; set; }

        public int MenuItemId { get; set; } 

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }

        public Order Order { get; set; } = null!;

        public MenuItems MenuItems { get; set; } = null!;
    }
}
