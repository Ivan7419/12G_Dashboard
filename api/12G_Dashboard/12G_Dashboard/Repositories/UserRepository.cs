using _12G_Dashboard.Models.Db;
using _12G_Dashboard.Repositories.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace _12G_Dashboard.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(IMongoDatabase database)
        {
            _users = database.GetCollection<User>("Users");
        }

        public async Task CreateAsync(User user) => await _users.InsertOneAsync(user);

        public async Task DeleteAsync(ObjectId id) => await _users.DeleteOneAsync(p => p.Id == id);

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _users.Find(_ => true).ToListAsync();
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _users.Find(p => p.Email == email).FirstOrDefaultAsync();
        }

        public async Task<User> GetByIdAsync(ObjectId id)
        {
            return await _users.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(User user) => await _users.ReplaceOneAsync(u => u.Id == user.Id, user);
    }
}
