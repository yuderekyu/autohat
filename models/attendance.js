var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * @TODO potentially change this format
 */
var AttendanceSchema = new Schema({
    timestamp: Date,
    present: Number,
    absent: Number,
    total: Number,
});

var Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;