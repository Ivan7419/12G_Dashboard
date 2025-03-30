using _12G_Dashboard.Models.Db.Stock;
using _12G_Dashboard.Repositories.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace _12G_Dashboard.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IMongoCollection<Product> _products;
        private readonly IMongoCollection<Brand> _brands;

        public ProductRepository(IMongoDatabase database)
        {
            _products = database.GetCollection<Product>("Products");
            _brands = database.GetCollection<Brand>("Brands");
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _products.Find(_ => true).ToListAsync();
        }

        public async Task<Product> GetByIdAsync(ObjectId id)
        {
            return await _products.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Product> GetByArticleAsync(string article)
        {
            return await _products.Find(p => p.Article == article).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Product product) => await _products.InsertOneAsync(product);

        public async Task UpdateAsync(Product product) => await _products.ReplaceOneAsync(p => p.Id == product.Id, product);

        public async Task DeleteAsync(ObjectId id) => await _products.DeleteOneAsync(p => p.Id == id);

        public async Task CreateBrandAsync(Brand brand) => await _brands.InsertOneAsync(brand);

        public async Task<IEnumerable<Brand>> GetBrandsByIdsAsync(IEnumerable<ObjectId> ids)
        {
            var filter = Builders<Brand>.Filter.In("_id", ids);
            return await _brands.Find(filter).ToListAsync();
        }

        public async Task<IEnumerable<Brand>> GetAllBrandsAsync()
        {
            return await _brands.Find(_ => true).ToListAsync();
        }
    }
}
