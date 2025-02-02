using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace _12G_Dashboard.Models.Auth
{
    public class VerifyRequest
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string VerificationCode { get; set; }
        public DateTime ExpirationTime { get; set; }
    }
}