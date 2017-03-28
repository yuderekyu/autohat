var Directory = require('../directory.json');
var Attendance = require('../models/attendance');

/** 
 * Searches within the arppush blob for each user registered within the directory 
 * @returns Attendance
 */
var findMacAddresses = blob => {
    var directory = Object.keys(Directory);
    var total = directory.length;
    var present = 0 
    var absent = 0;
    for (var user in directory){
        // console.log("user: "+directory[user]);
        for (var arpUser in blob){
            console.log("directory[user]: "+directory[user] + " = " +"arpUser: " + arpUser);
            if (directory[user] === arpUser)
                present++;
                console.log("present: " + present);
        }
    }
    return createAttendance(present, total);
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
    console.log("attendance: " + attendance);
    return attendance;
}

module.exports.findMacAddresses = findMacAddresses;