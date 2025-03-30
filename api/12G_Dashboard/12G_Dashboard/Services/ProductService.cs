using _12G_Dashboard.Models.Db.Stock;
using _12G_Dashboard.Models.DTOs;
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

        public async Task CreateBrandAsync(Brand brand)
        {
            if (brand == null) return;
            await _productRepository.CreateBrandAsync(brand);
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

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllAsync();
            var brandIds = products.Select(p => p.BrandId).Distinct().ToList();
            var brands = await _productRepository.GetBrandsByIdsAsync([.. brandIds]); 
            var brandDict = brands.ToDictionary(b => b.Id, b => b.Name);

            var result = products.Select(p => new ProductDto
            {
                Id = p.Id.ToString(),
                Name = p.Name,
                Price = p.Price,
                Brand = brandDict.TryGetValue(p.BrandId, out var brandName) ? brandName : "—",
                Article = p.Article,
                Colors = p.ColorVariations.ToList()
            });
            return result;
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

        public async Task<IEnumerable<Brand>> GetAllBrandsAsync() {
            return await _productRepository.GetAllBrandsAsync();
        }
    }
}