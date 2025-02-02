using StackExchange.Redis;

namespace _12G_Dashboard.Services
{
    public class RedisService
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly IDatabase _db;

        public RedisService(IConnectionMultiplexer redis)
        {
            _redis = redis;
            _db = _redis.GetDatabase();
        }

        public async Task SetJwtTokenAsync(string key, string token)
        {
            await _db.StringSetAsync(key, token);
        }

        public async Task<string> GetJwtTokenAsync(string key)
        {
            return await _db.StringGetAsync(key);
        }
    }
}
