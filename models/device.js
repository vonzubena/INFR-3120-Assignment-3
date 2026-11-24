// Device model: what each device record looks like in MongoDB.
// Same pattern as the book model from class.
let mongoose = require('mongoose');

let deviceModel = mongoose.Schema({
    name: String,
    category: String,
    brand: String,
    ipAddress: String,
    location: String,
    status: String
},
{
    collection: "devices"
});

module.exports = mongoose.model('Device', deviceModel);