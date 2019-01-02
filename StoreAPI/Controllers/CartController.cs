using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly StoreContext _context;

        public CartController(StoreContext context)
        {
            _context = context;
        }

        //Get all Items in the cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCart()
        {
            var cart = await _context.CartItems.ToListAsync();

            //This is a workaround for the issue that my in-memory database does not, aparently, support FKs
            foreach (var cartItem in cart)
            {
                cartItem.Product = await _context.Products.FindAsync(cartItem.ProductId);
            }

            return cart;
        }

        // Get a specific item from the cart
        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);

            if (cartItem == null)
            {
                return NotFound();
            }

            return cartItem;
        }

        //Add a new Item to the cart
        [HttpPost]
        public async Task<ActionResult<IEnumerable<CartItem>>> AddCartitem(CartItem cartItem)
        {
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return GetCart().Result;
        }

        // Update an item in the cart
        [HttpPut("{id}")]
        public async Task<ActionResult<IEnumerable<CartItem>>> PutTodoItem(int id, CartItem cartItem)
        {
            if (id != cartItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(cartItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return GetCart().Result;
        }
    }
}
