using _12G_Dashboard.Models.Db.Stock;
using _12G_Dashboard.Models.DTOs;
using MongoDB.Bson;

namespace _12G_Dashboard.Services.Interfaces
{
    public interface IProductService
    {
        Task<Product?> GetProductByArticleAsync(string article);
        Task<Product?> GetProductByIdAsync(ObjectId id);
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task CreateProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(ObjectId id);
        Task CreateBrandAsync(Brand brand);
        Task<IEnumerable<Brand>> GetAllBrandsAsync();
    }
}
