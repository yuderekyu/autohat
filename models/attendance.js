var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * @TODO potentially change this format
 */
var AttendanceSchema = new Schema({
    start: {type: Date, default: Date.now},
    end: Date,
    data: [{
        timestamp: Date,
        present: Number,
        absent: Number,
        total: Number,
        status: [{email: String, present: Boolean}]
    }]
});

var Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;
