const express = require("express");
const router = express.Router();
const { getDB } = require("../mongoClient");
const { getCoordsFromZIP, getZIPFromCoords } = require("../api");


module.exports = router.get("/", async (req, res) => {

    try {

        const { zip, lat, lon } = req.body;

        if (zip) {
            const coords = await getCoordsFromZIP(zip);
            res.send({ zip, coords });
        }
        else if (lat && lon) {
            const zip = await getZIPFromCoords(lat, lon);
            res.send({ zip, lat, lon})
        }
        else {
            res.status(400).send("ERROR");
        }
 
    }

    catch (err) {
        console.error(err);
        res.status(500).send("internal server error")
    }

});
