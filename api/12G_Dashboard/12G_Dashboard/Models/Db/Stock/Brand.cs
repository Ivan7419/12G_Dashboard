using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace _12G_Dashboard.Models.Db.Stock
{
    public class Brand
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        public required string Name { get; set; }

        [BsonIgnore]
        public IEnumerable<Product> Products { get; set; } = [];
    }
}