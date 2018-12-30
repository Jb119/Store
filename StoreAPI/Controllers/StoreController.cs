using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly StoreContext _context;

        public StoreController(StoreContext context)
        {
            _context = context;

            if (_context.Products.Count() == 0)
            {
                //Seed Products
                _context.Products.Add(new Product
                {
                    Name = "Widget",
                    Description = "Replacement widget for the iGadget X.",
                    Price = 12.99M
                });
                _context.Products.Add(new Product
                {
                    Name = "Dongle",
                    Description = "Adapter to allow you to use your legacy widget with the iGadget X proprietary multi-port.",
                    Price = 29.99M
                }); _context.Products.Add(new Product
                {
                    Name = "iGadget X",
                    Description = "The premier iGadget for the Screen-is-Life Crowd.",
                    Price = 1599.99M
                });
                _context.SaveChanges();
            }
        }


        //GET: api/Store
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }



    }
}
