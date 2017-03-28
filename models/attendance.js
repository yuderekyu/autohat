var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * @TODO potentially change this format
 */
var AttendanceSchema = new Schema({
    absent: Number,
    present: Number,
    total: Number,
    timestamp: Date
});

var Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;