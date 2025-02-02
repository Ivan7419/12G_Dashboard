using MongoDB.Bson;

namespace _12G_Dashboard.Services.Interfaces
{
    public interface IProductService
    {
        Task<Product?> GetProductByArticleAsync(string article);
        Task<Product?> GetProductByIdAsync(ObjectId id);
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task CreateProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(ObjectId id);
    }
}
