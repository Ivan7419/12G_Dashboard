using _12G_Dashboard.Models.Auth;
using _12G_Dashboard.Repositories.Interfaces;
using MongoDB.Driver;

namespace _12G_Dashboard.Repositories
{
    public class VerificationRequestRepository : IVerificationRequestRepository
    {
        private readonly IMongoCollection<VerifyRequest> _verificationRequests;

        public VerificationRequestRepository(IMongoDatabase database)
        {
            _verificationRequests = database.GetCollection<VerifyRequest>("VerificationRequests");
        }

        public async Task CreateAsync(VerifyRequest request) => await _verificationRequests.InsertOneAsync(request);

        public async Task DeleteAsync(string email) 
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentException("Email cannot be null or empty", nameof(email));
            }

            var filter = Builders<VerifyRequest>.Filter.Eq("_id", email);
            await _verificationRequests.DeleteOneAsync(filter);
        }

        public async Task<VerifyRequest> GetByEmailAsync(string email)
        {
            return await _verificationRequests.Find(req => req.Email == email).FirstOrDefaultAsync();
        }
    }
}
