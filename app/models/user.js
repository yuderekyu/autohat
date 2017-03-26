var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    ip: String,
    mac: String,
    vendor: String,
    timestamp: String
});

module.exports = mongoose.model('User', UserSchema);