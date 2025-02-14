using _12G_Dashboard.Models.Auth;
using _12G_Dashboard.Repositories.Interfaces;
using _12G_Dashboard.Services.Interfaces;

namespace _12G_Dashboard.Services
{
    public class VerificationRequestService : IVerificationRequestService
    {
        private readonly EmailService _emailService;
        private readonly RedisService _redisService;

        public VerificationRequestService(EmailService emailService, RedisService redisService) 
        {
            _emailService = emailService;
            _redisService = redisService;
        }

        public async Task AddVerificationRequest(string email)
        {
            VerifyRequest request = new VerifyRequest
            {
                Email = email,
                VerificationCode = GenerateVerificationCode(),
                ExpirationTime = DateTime.UtcNow.AddMinutes(3)
            };
            await _redisService.SetDataAsync($"verification:{email}", request);
            await _emailService.SendEmailAsync(request.Email, "Authorization", "Your verification code is " + request.VerificationCode);
        }

        public async Task<bool> Check(string email, string verificationCode)
        {
            var req = await _redisService.GetDataAsync<VerifyRequest>(email);
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
    }
}
