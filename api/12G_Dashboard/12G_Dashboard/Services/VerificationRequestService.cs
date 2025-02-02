using _12G_Dashboard.Models.Auth;
using _12G_Dashboard.Repositories.Interfaces;
using _12G_Dashboard.Services.Interfaces;

namespace _12G_Dashboard.Services
{
    public class VerificationRequestService : IVerificationRequestService
    {
        private readonly IVerificationRequestRepository _verificationRequestRepository;
        private readonly EmailService _emailService;

        public VerificationRequestService(IVerificationRequestRepository verificationRequestRepository, EmailService emailService) 
        {
            _verificationRequestRepository = verificationRequestRepository;
            _emailService = emailService;
        }

        public async Task AddVerificationRequest(string email)
        {
            VerifyRequest request = new VerifyRequest
            {
                Email = email,
                VerificationCode = GenerateVerificationCode(),
                ExpirationTime = DateTime.UtcNow.AddMinutes(3)
            };
            var oldRequest = await _verificationRequestRepository.GetByEmailAsync(email);
            if (oldRequest != null)
            {
                await RemoveVerificationRequest(email);
                
            }
            await _verificationRequestRepository.CreateAsync(request);
            await _emailService.SendEmailAsync(request.Email, "Authorization", "Your verification code is " + request.VerificationCode);
        }

        public async Task<bool> Check(string email, string verificationCode)
        {
            var req = await _verificationRequestRepository.GetByEmailAsync(email);
            if (req == null || 
                req.VerificationCode != verificationCode ||
                req.ExpirationTime < DateTime.Now) return false; 
            return true;
        }

        public string GenerateVerificationCode(int length = 6)
        {
            var random = new Random();
            return new string(Enumerable.Repeat("0123456789", length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public async Task RemoveVerificationRequest(string email) => await _verificationRequestRepository.DeleteAsync(email);
    }
}
