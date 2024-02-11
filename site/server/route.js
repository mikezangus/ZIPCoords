const express = require("express");
const router = express.Router();
const { getDB } = require("./mongoClient");


module.exports = router.get("/", async (req, res) => {

    try {

        const db = getDB();
        const collection = db.collection("locations");
        let { zip, lat, lon } = req.query;
        let query = {};
        let pipeline = [];


        if (zip) {
            query = { ZIP: zip };
            pipeline.push({ $match: query });
        }
        else if (lat && lon) {
            lat = parseFloat(lat);
            lon = parseFloat(lon);
            console.log(lat, lon)
            pipeline.push({
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    distanceField: "distance",
                    spherical: true
                }
            });
        }
        else {
            return res.status(400).send("ZIP code or coordinates are required");
        }

        const projection = {
            _id: 0,
            zip: "$ZIP",
            lat: { $arrayElemAt: ["$COORDS.coordinates", 1] },
            lon: { $arrayElemAt: ["$COORDS.coordinates", 0] }
        };

        pipeline.push({ $project: projection });

        const data = await collection.aggregate(pipeline).toArray();
        res.json(data);
        console.log("Data:", data);

    } catch (err) {

        console.error("Error", err);
        res.status(500).send("Internal Server Error");

    };

});