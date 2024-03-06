// Importing the required modules
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
// Creating an instance of the Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Mounting the main router at the "/api/v1" endpoint
app.use("/api/v1", rootRouter);

// Starting the server and listening on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000 🚀");
});
