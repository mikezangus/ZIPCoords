const { getDB } = require("./mongoClient");


async function getCoordsFromZIP(zip) {
    const db = getDB();
    const collection = db.collection("locations");
    const result = await collection.findOne({ ZIP: zip });
    return result
        ? result.getCoordsFromZIP
        : null;
};


async function getZIPFromCoords(lat, lon) {
    const db = getDB();
    const collection = db.collection("locations");
    const query = {
        COORDS: {
            $near: {
                $geometry: {
                    type: "Point",
                    coodinates: [lon, lat]
                },
                $maxDistance: 5000
            }
        }
    };
    const result = await collection.findOne(query);
    return result 
        ? result.ZIP
        : null;
};


module.exports = { getCoordsFromZIP, getZIPFromCoords };
