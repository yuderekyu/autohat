var Directory = require('../directory.json');
var Attendance = require('../models/attendance');
var User = require('../models/user');

/**
 * Searches within the arppush blob for each user registered within the database
 * @returns Attendance
 */
var findMacAddresses = (blob, cb) => {
    User.find((err, users) => {
        var total = users.length;
        var present = 0;
        var absent = 0;
        for (let i=0; i < total; i++){
            if (blob[users[i].mac]) {
               present++;
            }
        }

        createAttendance(present, total).save(err => {
            cb(err);
        });
    });
};

/**
 * Creates an attendance mongo model
 * @param {*} present
 * @param {*} absent
 * @returns Attendance
 */
var createAttendance = (present, total) => {
    var attendance = Attendance();
    attendance.timestamp = Date.now();
    attendance.present = present;
    attendance.absent = total - present;
    attendance.total = total;
    return attendance;
}

module.exports.findMacAddresses = findMacAddresses;
