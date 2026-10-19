using System.ComponentModel.DataAnnotations;

namespace SpideyCafe.Models
{
    public class MenuItems
    {
        [Key]
        public int MenuItemId { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string? Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string Category { get; set; } = string.Empty;
        [Required]
        public string? ImageUrl { get; set; }
        [Required]
        public bool IsAvailable { get; set; } = true;
    }
}
