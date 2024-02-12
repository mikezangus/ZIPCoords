const express = require("express");
const cors = require("cors");
const { connectToMongo } = require("./mongoClient");
const createIndex = require("./createIndex");
const clientRoute = require("./routes/clientRoute");


const app = express();
const PORT = 4001;


function loadRoutes() {
    app.use("/client", clientRoute);
}


async function startServer() {
    app.use(cors());
    try {
        await connectToMongo();
        await createIndex();
        loadRoutes();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch(err) {
        console.error("Failed to start server");
    };
};


startServer();
