using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class UrlRecord
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        public string Shortcut { get; set; }
    }
}
