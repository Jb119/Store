using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreAPI.Models
{
    public class CartItem
    {
        public int Id { get; set; }

        public Product Product { get; set; }

        public long ProductId { get; set; }

        public int Quantity { get; set; }

    }
}
