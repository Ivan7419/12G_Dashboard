using _12G_Dashboard.Models.Db.Stock;
using _12G_Dashboard.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Product>> Get(string id)
    {
        if (!ObjectId.TryParse(id, out ObjectId objectId))
        {
            return BadRequest("Invalid ObjectId format.");
        }
        var product = await _productService.GetProductByIdAsync(objectId);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    [HttpPost("seed")]
    public async Task<ActionResult> Seed()
    {
        var faker = new Bogus.Faker();

        // Create random products
        var products = Enumerable.Range(1, 10).Select(_ => new Product
        {
            Name = faker.Commerce.ProductName(),
            Brand = new _12G_Dashboard.Models.Db.Stock.Brand { Name = faker.Company.CompanyName() },
            Article = faker.Random.String2(10, "abcdefghijklmnopqrstuvwxyz0123456789"),
            ColorVariations = Enumerable.Range(1, faker.Random.Int(1, 5)).Select(_ => new ColorVariation
            {
                Color = faker.Commerce.Color(),
                Sizes = Enumerable.Range(1, faker.Random.Int(1, 5)).Select(_ => new Size
                {
                    Quantity = faker.Random.Int(1, 100),
                    SizeName = faker.PickRandom(new[] { "XS", "S", "M", "L", "XL", "XXL" })
                }).ToList()
            }).ToList(),
            Price = decimal.Parse(faker.Commerce.Price(min: 10, max: 500))
        }).ToList();

        // Seed each product into the database
        foreach (var product in products)
        {
            await _productService.CreateProductAsync(product);
        }

        return Ok(new { Message = "Database seeded successfully" });
    }

    [HttpGet("get-all")]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        var products = await _productService.GetAllProductsAsync();
        return Ok(products);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] Product product)
    {
        await _productService.CreateProductAsync(product);
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }
}