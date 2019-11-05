using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PRS_ServerV2.Models {

    public partial class RequestLines {

        public int Id { get; set; }
        public int RequestId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        public virtual Products Product { get; set; }
        [JsonIgnore]
        public virtual Requests Request { get; set; } // JsonIgnore will stop infinite references. Matters which file it is placed in.
    }
}
