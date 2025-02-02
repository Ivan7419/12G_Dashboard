using _12G_Dashboard.Models.Auth;
using _12G_Dashboard.Models.Db;
using _12G_Dashboard.Services;
using _12G_Dashboard.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace _12G_Dashboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;
        private readonly IVerificationRequestService _verificationService;
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration,
            IVerificationRequestService verificationService,
            IAuthService authService,
            IUserService userService)
        {
            _configuration = configuration;
            _verificationService = verificationService;
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.Name))
            {
                return BadRequest("Missing required fields");
            }

            var existingUser = await _userService.GetUserByEmailAsync(user.Email);
            if (existingUser != null) return Conflict("This user already exists");

            await _verificationService.AddVerificationRequest(user.Email);

            await _userService.CreateUserAsync(user);

            return Ok(new { Message = "Verification code sent successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var user = await _authService.AuthenticateAsync(loginModel.Email, loginModel.Password);

            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            if (!user.Devices.Contains(loginModel.DeviceId))
            {
                return Ok(new { Requires2FA = true }); 
            }
            var jwtToken = _authService.GenerateJwtToken(user);
            return Ok(new { Token = jwtToken, Requires2FA = false });
        }

        [HttpPost("send-2fa-code")]
        public async Task<IActionResult> Send2FACode([FromBody] EmailRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest(new { Message = "Email is required" });
            }

            await _verificationService.AddVerificationRequest(request.Email);

            return Ok(new { Message = "Verification code sent successfully" });
        }

        [HttpPost("verify-2fa-code")]
        public async Task<IActionResult> Verify2FACode([FromBody] VerifyRequest request, [FromQuery] string deviceId)
        {
            if(request == null)
            {
                return BadRequest("Request body is null");
            }
            var user = await _userService.GetUserByEmailAsync(request.Email);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (!await _verificationService.Check(request.Email, request.VerificationCode))
            {
                return BadRequest(new { Message = "Invalid or expired code" });
            }

            user.HasPassed2FA = true;
            if(!user.Devices.Contains(deviceId)) user.Devices.Add(deviceId);
            await _userService.UpdateUserAsync(user);

            await _verificationService.RemoveVerificationRequest(request.Email);
            var jwtToken = _authService.GenerateJwtToken(user);

            return Ok(new { Message = "2FA verification successful", Token = jwtToken });
        }
    }
}