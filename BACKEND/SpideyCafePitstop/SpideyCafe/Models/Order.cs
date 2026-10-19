using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpideyCafe.Models
{
    public class Order
    {
        public int  OrderID { get; set; }

        public int CafeTableID { get; set; }

        public string CustomerName { get; set; } 

        public string Status { get; set; } 

        public string PaymentStatus { get; set; }


        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; } 

        public DateTime CreatedAt { get; set; }

        public List<OrderItem> OrderItems { get; set; } = new();
    }
}
