using _12G_Dashboard.Models.Db;
using _12G_Dashboard.Repositories.Interfaces;
using _12G_Dashboard.Services.Interfaces;
using MongoDB.Bson;

namespace _12G_Dashboard.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRegisterCodeRepository _registerCodeRepository;

        public UserService(IUserRepository userRepository, IRegisterCodeRepository registerCodeRepository)
        {
            _userRepository = userRepository;
            _registerCodeRepository = registerCodeRepository;
        }

        public async Task CreateRegisterCodeAsync(RegisterCode code)
        {
            await _registerCodeRepository.CreateAsync(code);
        }

        public async Task CreateUserAsync(User user) => await _userRepository.CreateAsync(user);

        public async Task DeleteUserAsync(ObjectId id) => await _userRepository.DeleteAsync(id);

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email);
        }

        public async Task<User?> GetUserByIdAsync(ObjectId id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task UpdateUserAsync(User user) => await _userRepository.UpdateAsync(user);
    }
}
