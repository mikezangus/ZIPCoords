import connectToMongo from "../../lib/mongoClient";


export default async function handler(req, res) {


    let { zip, lat, lon } = req.query;
    let query = {};
    let pipeline = [];

    try {

        const db = await connectToMongo();
        const collection = db.collection("locations");

        if (zip) {
            query = { ZIP: zip };
            pipeline.push({ $match: query });
        }
        else if (lat && lon) {
            lat = parseFloat(lat);
            lon = parseFloat(lon);
            query = {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    distanceField: "distance",
                    spherical: true
                }
            }
            pipeline.push(query);
        }
        else {
            return res
                .status(400)
                .send("ZIP code or coordinates are required");
        }

        const projection = {
            _id: 0,
            zip: "$ZIP",
            lat: { $arrayElemAt: ["$COORDS.coordinates", 1] },
            lon: { $arrayElemAt: ["$COORDS.coordinates", 0] }
        };

        pipeline.push({ $project: projection}, { $limit: 1 });

        const data = await collection
            .aggregate(pipeline)
            .toArray();
        res
            .status(200)
            .json(data);

    } catch (err) {
        console.error("Error", err);
        if (!res.headersSent) {
            res
                .status(500)
                .json(
                    { error: "Internal server error" }
                )
        }
    }

};
