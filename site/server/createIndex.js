const { getDB } = require("./mongoClient");


async function createIndex() {
    try {
        const db = getDB();
        const collection = "locations";
        const field = "COORDS";
        const index = { [field]: "2dsphere" }
        await db
            .collection(collection)
            .createIndex(index);
    } catch (err) {
        console.error("Error creating index:", err);
    };
};

module.exports = createIndex;