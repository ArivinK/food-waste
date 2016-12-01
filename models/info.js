var mongoose = require('mongoose');


var infoSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: Number},
    food: {type: String},
    quantity: {type: String},
    location: {type: String},
    time: {type: Date},
    created: Date
    
});


module.exports = mongoose.model('Info', infoSchema);