using _12G_Dashboard.Models.Db.Stock;
using MongoDB.Bson;

namespace _12G_Dashboard.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<IEnumerable<Brand>> GetAllBrandsAsync();
        Task<Product> GetByIdAsync(ObjectId id);
        Task<Product> GetByArticleAsync(string article);
        Task CreateAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(ObjectId id);
        Task CreateBrandAsync(Brand brand);
        Task<IEnumerable<Brand>> GetBrandsByIdsAsync(IEnumerable<ObjectId> ids);
    }
}
