const express = require("express");
const cors = require("cors");
const { connectToMongo } = require("./mongoClient");
const createIndex = require("./createIndex");
const route = require("./route");

const app = express();
const PORT = 4001;


async function startServer() {
    app.use(cors());
    try {
        await connectToMongo();
        await createIndex();
        app.use("/route", route);
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch(err) {
        console.error("Failed to start server");
    };
};


startServer();