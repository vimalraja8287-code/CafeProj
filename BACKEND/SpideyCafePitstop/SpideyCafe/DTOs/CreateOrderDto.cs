using System.ComponentModel.DataAnnotations;

namespace SpideyCafe.DTOs
{
    public class CreateOrderDto
    {
        [Required]
        public string CafeTableNumber { get; set; } = string.Empty;

        public string? CustomerName { get; set; }

        [Required]
        [MinLength(1)]
        public List<CreateOrderItemDto> Items { get; set; } = new();
    }

    public class CreateOrderItemDto
    {
        [Range(1, int.MaxValue)]
        public int MenuItemId { get; set; }

        [Range(1, 50)]
        public int Quantity { get; set; }
    }
}
