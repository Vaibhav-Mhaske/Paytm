const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://vaibhav:8791435484@cluster0.qenvmnm.mongodb.net/paytm")

const mongooseSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

// create model for the schema
const User = mongoose.model('User', mongooseSchema);

module.exports = {
    User
}