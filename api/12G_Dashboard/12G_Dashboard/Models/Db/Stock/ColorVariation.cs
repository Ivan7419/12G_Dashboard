namespace _12G_Dashboard.Models.Db.Stock
{
    public class ColorVariation
    {
        public required string Color { get; set; }

        public Dictionary<string, int> Sizes { get; set; } = [];
    }
}
