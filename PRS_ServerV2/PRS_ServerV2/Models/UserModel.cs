using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PRS_ServerV2.Models {

    public partial class Users {

        public Users() {
        }

        public int Id { get; set; }
        [Required]
        [StringLength(30)]        
        public string Username { get; set; }
        [Required]
        [StringLength(30)]
        public string Password { get; set; }
        [Required]
        [StringLength(30)]
        public string Firstname { get; set; }
        [Required]
        [StringLength(30)]
        public string Lastname { get; set; }
        [StringLength(12)]
        public string Phone { get; set; }
        [StringLength(255)]
        public string Email { get; set; }
        public bool? IsReviewer { get; set; } // bool? in first file
        public bool? IsAdmin { get; set; } // bool? in first file

        [JsonIgnore]
        public virtual ICollection<Requests> Requests { get; set; }
    }
}
