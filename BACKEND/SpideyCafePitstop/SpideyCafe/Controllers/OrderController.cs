using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SpideyCafe.Data;
using SpideyCafe.DTOs;

using SpideyCafe.Models;

namespace SpideyCafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;

        public OrderController(ApplicationDbContext dbContext)
        {
            applicationDbContext = dbContext;

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {

            if (dto.Items == null || dto.Items.Count == 0)
            {
                Console.WriteLine("FAILED: Items are empty");
                return BadRequest("data wrong givens");
            }

            if (dto.Items.Any(i => i.MenuItemId <= 0 ||
                                      i.Quantity <= 0 ||
                                      i.Quantity > 50))
            {
                Console.WriteLine("FAILED: Invalid quantity or menu item ID");
                return BadRequest("Invalid menu item or quantity.");
            }


            var cafeTable = await applicationDbContext.cafeTables.FirstOrDefaultAsync(k => k.CafeTableNumber == dto.CafeTableNumber && k.IsActive);

            if (cafeTable == null)
            {
                Console.WriteLine("FAILED: Table not found or inactive");
                return BadRequest("Invalid Process ");

            }

            var requestedIds = dto.Items.Select(k => k.MenuItemId).Distinct().ToList();

            var menuitems = await applicationDbContext.menuItems.Where(m => requestedIds.Contains(m.MenuItemId)).ToListAsync();

            if (menuitems.Count != requestedIds.Count)
            {
                Console.WriteLine("FAILED: Menu item ID not found");
                return BadRequest();

            }

            if (menuitems.Any(m => !m.IsAvailable))
            {
                return BadRequest("One or more items are unavailable.");
            }

            decimal TotalAmount = 0;

            var order = new Order
            {
                CafeTableID = cafeTable.CafeTableID,
                CustomerName = dto.CustomerName ?? string.Empty,
                Status = "New",
                PaymentStatus = "Pending",
                CreatedAt = DateTime.UtcNow
            };

            foreach (var requestedItem in dto.Items)
            {
                var menuItem = menuitems.First(
                    m => m.MenuItemId == requestedItem.MenuItemId);

                var lineTotal = menuItem.Price * requestedItem.Quantity;
                TotalAmount += lineTotal;

                order.OrderItems.Add(new OrderItem
                {
                    MenuItemId = menuItem.MenuItemId,
                    Quantity = requestedItem.Quantity,
                    UnitPrice = menuItem.Price
                });

                order.TotalAmount = TotalAmount;

                applicationDbContext.orders.Add(order);
                await applicationDbContext.SaveChangesAsync();

            }

            return CreatedAtAction(
           nameof(GetOrderById),
           new { id = order.OrderID },
           new
           {
               order.OrderID,
               TableNumber = cafeTable.CafeTableNumber,
               order.CustomerName,
               order.Status,
               order.PaymentStatus,
               order.TotalAmount,
               order.CreatedAt,
               Items = order.OrderItems.Select(i => new
               {
                   i.MenuItemId,
                   i.Quantity,
                   i.UnitPrice,
                   LineTotal = i.Quantity * i.UnitPrice
               })
           });
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await applicationDbContext.orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.OrderID == id);

            if (order == null)
            {
                return NotFound("Order not found.");
            }

            return Ok(order);
        }



        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await applicationDbContext.orders
                .Include(o => o.OrderItems)
                .OrderByDescending(o => o.CreatedAt)
                .Join(
                    applicationDbContext.cafeTables,
                    order => order.CafeTableID,
                    table => table.CafeTableID,
                    (order, table) => new
                    {
                        order.OrderID,

                        TableNumber = table.CafeTableNumber,

                        order.CustomerName,
                        order.Status,
                        order.PaymentStatus,
                        order.TotalAmount,
                        order.CreatedAt,

                        Items = order.OrderItems.Select(i => new
                        {
                            i.MenuItemId,
                            i.Quantity,
                            i.UnitPrice,
                            LineTotal = i.Quantity * i.UnitPrice
                        })
                    })
                .ToListAsync();

            return Ok(orders);
        }



        [HttpPatch("{id:int}/status")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<IActionResult> UpdateOrderStatus(
            int id,
            [FromBody] string status)
        {
            var order = await applicationDbContext.orders
                .FirstOrDefaultAsync(o => o.OrderID == id);

            if (order == null)
            {
                return NotFound("Order not found.");
            }

            var allowedStatuses = new[]
            {
                   "New",
                   "Preparing",
                   "Ready",
                   "Served"
                   };

            if (!allowedStatuses.Contains(status))
            {
                return BadRequest("Invalid order status.");
            }

            order.Status = status;

            await applicationDbContext.SaveChangesAsync();

            return Ok(new
            {
                message = "Order status updated successfully.",
                order.OrderID,
                order.Status
            });
        }


        [HttpGet("status/{status}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetOrdersByStatus(string status)
        {
            var allowedStatuses = new[]
            {
                "New",
                "Preparing",
                "Ready",
                "Served"
            };

            if (!allowedStatuses.Contains(status))
            {
                return BadRequest("Invalid order status.");
            }



            var orders = await applicationDbContext.orders
                .Where(o => o.Status == status)
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new
                {
                    o.OrderID,
                    o.CafeTableID,
                    o.CustomerName,
                    o.Status,
                    o.PaymentStatus,
                    o.TotalAmount,
                    o.CreatedAt
                })
                .ToListAsync();

            return Ok(orders);



        }




    }







}


