import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
let cachedDB = null;


export default async function connectToMongo() {
    if (cachedDB) {
        return cachedDB;
    }
    try {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await client.connect();
        cachedDB = client.db(dbName);
        return cachedDB;
    }
    catch (error) {
        console.error("Failed to connect to database", error);
        throw new Error("Failed to connect to database")
    }

}