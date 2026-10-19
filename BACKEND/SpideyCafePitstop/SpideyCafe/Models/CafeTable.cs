using System.ComponentModel.DataAnnotations;

namespace SpideyCafe.Models
{
    public class CafeTable
    {
        [Key]
        public int CafeTableID { get; set; }

        [Required]

        public String CafeTableNumber { get; set; }

        [Required]

        public bool IsActive { get; set; } = true;

    }
}
