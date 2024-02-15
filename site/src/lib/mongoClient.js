import { MongoClient } from "mongodb";


const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.${process.env.ID}.mongodb.net/?retryWrites=true&w=majority`;
const dbName = process.env.DATABASE;
let cachedDB = null;


export default async function connectToMongo() {
    if (cachedDB) {
        return cachedDB;
    }
    try {
        const client = new MongoClient(uri);
        await client.connect();
        cachedDB = client.db(dbName);
        return cachedDB;
    }
    catch (error) {
        console.error("Failed to connect to database", error);
        throw new Error("Failed to connect to database")
    }

}