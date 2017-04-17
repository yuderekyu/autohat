const Attendance = require('../models/attendance');
const User = require('../models/user');

/**
 * Creates a new attendance models starting now.
 */
 const startAttendance = (blob, cb) => {
    Attendance.findOne({end: null}, (err, a) => {
        if (err) {
            cb(err);
            return;
        }
        if (a) {
            // don't start if a session already exists
            cb();
            return;
        }

        const attendance = new Attendance();
        attendance.save(err => {
            cb(err);
        });
    });
 };

/**
 * Stops an attendance from recording by setting the end time to now
 */
 const stopAttendance = (blob, cb) => {
    Attendance.findOne({end: null}, (err, a) => {
        if (err) {
            cb(err);
            return;
        }
        if (!a) {
            cb();
            return;
        }

        a.end = Date.now();
        a.save(err => {
            cb(err);
        });
    });
 };


/**
 * Searches within the arppush blob for each user registered within the database
 * @returns Attendance
 */
const findMacAddresses = (blob, cb) => {
    Attendance.findOne({end: null}, (err, a) => {
        if (err) {
            cb(err);
            return;
        }
        if (!a) {
            cb();
            return;
        }

        User.find((err, users) => {
            const total = users.length;
            let present = 0;
            let emails = [];
            for (let i=0; i < total; i++) {
                let status = {email: users[i].email};
                if (blob[users[i].mac]) {
                   present++;
                   status.present = true;
                }
            }

            createAttendance(a, present, total).save(err => {
                cb(err);
            });
        });
    });
};

/**
 * Creates an attendance mongo model
 * @param {*} present
 * @param {*} absent
 * @returns Attendance
 */
const createAttendance = (attendance, present, total, emails) => {
    let segment = {};
    segment.timestamp = Date.now();
    segment.present = present;
    segment.absent = total - present;
    segment.total = total;
    segment.status = emails;
    attendance.data.push(segment);
    return attendance;
};

module.exports.startAttendance = startAttendance;
module.exports.stopAttendance = stopAttendance;
module.exports.findMacAddresses = findMacAddresses;
