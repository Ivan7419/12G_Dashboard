using _12G_Dashboard.Models.Db;
using _12G_Dashboard.Repositories.Interfaces;
using _12G_Dashboard.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace _12G_Dashboard.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IRegisterCodeRepository _registerCodeRepository;

        public AuthService(IUserRepository userRepository, IConfiguration configuration, IRegisterCodeRepository registerCodeRepository)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _registerCodeRepository = registerCodeRepository;
        }

        public async Task<User?> AuthenticateAsync(string email, string password)
        {
            User user = await _userRepository.GetByEmailAsync(email);
            if (user == null || user.Password != password)
            {
                return null;
            }
            return user;
        }

        public async Task<bool> CheckRegisterCode(string code)
        {
            var regCode = await _registerCodeRepository.GetByCode(code);
            if(regCode == null) return false;
            await _registerCodeRepository.DeleteAsync(regCode.Id); 
            return true;
        }

        public string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
