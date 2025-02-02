using _12G_Dashboard.Models.Auth;
using MongoDB.Bson;

namespace _12G_Dashboard.Repositories.Interfaces
{
    public interface IVerificationRequestRepository
    {
        Task<VerifyRequest> GetByEmailAsync(string email);
        Task CreateAsync(VerifyRequest request);
        Task DeleteAsync(string email);
    }
}
