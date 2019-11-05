using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PRS_ServerV2.Models {

    public partial class Products {

        public Products() {
        }

        public int Id { get; set; }
        [Required]
        [StringLength(30)]
        public string PartNbr { get; set; }
        [Required]
        [StringLength(30)]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "decimal(11,2)")]
        public decimal Price { get; set; }
        [Required]
        [StringLength(30)]
        public string Unit { get; set; }
        [StringLength(255)]
        public string PhotoPath { get; set; }
        [Required]
        public int VendorId { get; set; }

        public virtual Vendors Vendor { get; set; }
    }
}
