using _12G_Dashboard.Models.Db;
using MongoDB.Bson;

namespace _12G_Dashboard.Services.Interfaces
{
    public interface IUserService
    {
        Task<User?> GetUserByIdAsync(ObjectId id);
        Task<User?> GetUserByEmailAsync(string email);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(ObjectId id);
    }
}
