// Importing the required modules
const express = require("express");
const cors = require("cors");

// Creating an instance of the Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Importing the main router module
const mainRouter = require("./routes/index");

// Mounting the main router at the "/api/v1" endpoint
app.use("/api/v1", mainRouter);

// Starting the server and listening on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000 🚀");
});

// timestamp == 39.30