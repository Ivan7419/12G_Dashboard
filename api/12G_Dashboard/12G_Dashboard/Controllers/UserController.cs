using _12G_Dashboard.Models.Db;
using Google.Authenticator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace _12G_Dashboard.Controllers
{
    [Route("api/[controller]")]
    //[Authorize(Policy = "Require2FA")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;

        public UserController(IMongoDatabase database)
        {
            _users = database.GetCollection<User>("Users");
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<User>> Get()
        {
            return await _users.Find(_ => true).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<User>> Create(User user)
        {
            await _users.InsertOneAsync(user);
            return CreatedAtRoute(new { id = user.Id }, user);
        }
    }
}
