import { MongoClient } from "mongodb";


const uri = process.env.URI;
const dbName = process.env.DATABASE;
let cachedDB = null;


export default async function connectToMongo() {
    if (cachedDB) {
        console.log("Cached DB exists")
        return cachedDB;
    }
    try {
        const client = new MongoClient(uri);
        await client.connect();
        cachedDB = client.db(dbName);
        console.log("Connected to mongo")
        return cachedDB;
    }
    catch (error) {
        console.error("Failed to connect to database", error);
        throw new Error("Failed to connect to database")
    }

}