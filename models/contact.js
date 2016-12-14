var mongoose = require('mongoose');


var contactSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    message: {type: String},
    created: Date
    
});


module.exports = mongoose.model('ContactMessage', contactSchema);