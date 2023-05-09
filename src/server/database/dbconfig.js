const { MongoClient } = require("mongodb");

const Db = process.env.CONNECTION_URL || "mongodb+srv://pronauman:pronauman@cluster0.wchgca6.mongodb.net/Healthquest?retryWrites=true&w=majority";
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: async function () {
        console.log("Connecting to server...");
        try {
            await client.connect();
            _db = client.db("Healthquest");
            console.log("Successfully connected to MongoDB.");
        } catch (err) {
            console.error("Failed to connect to MongoDB", err);
        }
    },

    getDb: function () {
        return _db;
    },
};