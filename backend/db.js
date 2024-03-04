// Importing the mongoose library
const mongoose = require('mongoose');

// Connecting to the MongoDB database using the provided connection string
mongoose.connect("mongodb+srv://vaibhav:8791435484@cluster0.qenvmnm.mongodb.net/paytm")

// Defining the schema for the user collection in the database
const mongooseSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

// Creating a model for the user schema
const User = mongoose.model('User', mongooseSchema);

// Exporting the User model to be used in other files
module.exports = {
    User
}