using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace _12G_Dashboard.Models.Auth
{
    public class RegistrationModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        [Required]
        public string UserCode { get; set; }

        [Required]
        public string VerificationCode { get; set; }

        public DateTime ExpirationTime { get; set; }
    }
}
