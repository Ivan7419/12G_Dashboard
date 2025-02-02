namespace _12G_Dashboard.Models.Db.Stock
{
    public class Brand
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public IEnumerable<Product> Products { get; set; } = [];
    }
}