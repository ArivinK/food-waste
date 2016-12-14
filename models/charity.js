var mongoose = require('mongoose');


var charitySchema = mongoose.Schema({
    name: {type: String},
    contact: {type: String},
    email: {type: String},
    phone: {type: Number},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    website: {type: String},
    description: {type: String},
    created: Date
    
});


module.exports = mongoose.model('Charity', charitySchema);