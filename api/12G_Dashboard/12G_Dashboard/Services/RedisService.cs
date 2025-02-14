using _12G_Dashboard.Models.Db;
using MongoDB.Bson.IO;
using StackExchange.Redis;
using Newtonsoft.Json;
using JsonConvert = Newtonsoft.Json.JsonConvert;
using Microsoft.Extensions.Caching.Distributed;

namespace _12G_Dashboard.Services
{
    public class RedisService
    {
        private readonly IDistributedCache _distributedCache;

        public RedisService(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }

        public async Task SetDataAsync<T>(string key, T data, TimeSpan? expiry = null)
        {
            var serializedData = JsonConvert.SerializeObject(data);
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = expiry ?? TimeSpan.FromMinutes(5)
            };

            await _distributedCache.SetStringAsync(key, serializedData, options);
        }

        public async Task<T> GetDataAsync<T>(string key)
        {
            var serializedData = await _distributedCache.GetStringAsync(key);
            if (string.IsNullOrEmpty(serializedData)) return default;
            return JsonConvert.DeserializeObject<T>(serializedData);
        }
    }
}
