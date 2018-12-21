using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreAPI.Models
{
    public class Cart
    {
        public List<Product> Items { get; set; }

        public decimal TotalPrice { get; set; }
    }
}
