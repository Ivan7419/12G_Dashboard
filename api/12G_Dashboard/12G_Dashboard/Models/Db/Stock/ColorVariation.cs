namespace _12G_Dashboard.Models.Db.Stock
{
    public class ColorVariation
    {
        public required string Color { get; set; }

        public IEnumerable<Size> Sizes { get; set; } = [];
    }
}
