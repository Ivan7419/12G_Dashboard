using _12G_Dashboard.Models.Auth;
using _12G_Dashboard.Models.Db;
using MongoDB.Driver;

//public class MongoDbContext
//{
//    private readonly IMongoDatabase _database;

//    public MongoDbContext(string connectionString, string databaseName)
//    {
//        var client = new MongoClient(connectionString);
//        _database = client.GetDatabase(databaseName);
//    }
//    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
//    public IMongoCollection<VerifyRequest> VerificationCodes => _database.GetCollection<VerifyRequest>("VerificationCodes");
//}