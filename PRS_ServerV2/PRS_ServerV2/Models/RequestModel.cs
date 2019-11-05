using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PRS_ServerV2.Models {

    public partial class Requests {

        public Requests() {
        }

        public int Id { get; set; }
        [Required]
        [StringLength(80)]
        public string Description { get; set; }
        [Required]
        [StringLength(80)]
        public string Justification { get; set; }
        [StringLength(80)]
        public string RejectionReason { get; set; }
        [Required]
        [StringLength(20)]
        public string DeliveryMode { get; set; }
        [Required]
        [StringLength(10)]
        public string Status { get; set; }
        [Required]
        [Column(TypeName = "decimal(11,2)")]
        public decimal Total { get; set; }
        public int UserId { get; set; } // int? in first file

        public virtual Users User { get; set; }
        public virtual ICollection<RequestLines> RequestLines { get; set; } // these virtuals will allow the controllers to access these other tables
    }
}
