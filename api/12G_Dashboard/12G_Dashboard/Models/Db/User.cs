using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using _12G_Dashboard.Services;

namespace _12G_Dashboard.Models.Db
{
    public class User
    {
        [BsonId]
        [JsonConverter(typeof(ObjectIdJsonConverter))]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        [Required]
        public required string Name { get; set; }
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        public List<string> Devices { get; set; } = new List<string>();
    }
}
