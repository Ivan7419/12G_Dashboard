using _12G_Dashboard.Repositories.Interfaces;
using _12G_Dashboard.Services.Interfaces;
using MongoDB.Bson;
using System.Collections;

namespace _12G_Dashboard.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task CreateProductAsync(Product product)
        {
            if (product == null) return;
            await _productRepository.CreateAsync(product);
        }

        public async Task DeleteProductAsync(ObjectId id)
        {
            await _productRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _productRepository.GetAllAsync();
        }

        public async Task<Product?> GetProductByArticleAsync(string article)
        {
            if(string.IsNullOrEmpty(article)) { return null; }  
            Product product = await _productRepository.GetByArticleAsync(article);
            return product;
        }

        public async Task<Product?> GetProductByIdAsync(ObjectId id)
        {
            return await _productRepository.GetByIdAsync(id);
        }

        public async Task UpdateProductAsync(Product product)
        {
            await _productRepository.UpdateAsync(product);
        }
    }
}