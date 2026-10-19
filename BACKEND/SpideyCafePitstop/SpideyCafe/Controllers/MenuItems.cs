using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpideyCafe.Data;

namespace SpideyCafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItems : ControllerBase
    {

        private readonly ApplicationDbContext applicationDbContext;

        public MenuItems(ApplicationDbContext dbContext)
        {
            applicationDbContext = dbContext;
            
        }


        [HttpGet]

        public async Task<IActionResult> Get()
        {

            var items =   applicationDbContext.menuItems.ToList();

            return Ok(items);

        
        }           
    }
}
