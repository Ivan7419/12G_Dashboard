using _12G_Dashboard.Models.Db;
using MongoDB.Bson;

namespace _12G_Dashboard.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User?> AuthenticateAsync(string email, string password);
        string GenerateJwtToken(User user);
    }
}