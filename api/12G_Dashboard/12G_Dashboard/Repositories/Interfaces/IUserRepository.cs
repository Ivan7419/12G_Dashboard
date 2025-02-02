using _12G_Dashboard.Models.Db;
using MongoDB.Bson;

namespace _12G_Dashboard.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetByIdAsync(ObjectId id);
        Task<User> GetByEmailAsync(string email);
        Task CreateAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(ObjectId id);
    }
}
