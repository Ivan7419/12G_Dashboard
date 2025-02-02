using _12G_Dashboard.Models.Auth;

namespace _12G_Dashboard.Services.Interfaces
{
    public interface IVerificationRequestService
    {
        public Task AddVerificationRequest(string email);
        public Task RemoveVerificationRequest(string email);
        public Task<bool> Check(string email, string code);
        public string GenerateVerificationCode(int length = 6);
    }
}