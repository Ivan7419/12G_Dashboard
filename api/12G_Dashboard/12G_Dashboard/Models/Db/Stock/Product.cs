using _12G_Dashboard.Models.Db.Stock;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }
    public required string Name { get; set; }
    public required string Article { get; set; }
    public decimal Price { get; set; }

    public IEnumerable<ColorVariation> ColorVariations { get; set; } = [];
    public required Brand Brand { get; set; }
}