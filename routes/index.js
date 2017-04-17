const express = require('express');
const Attendance = require('../models/attendance');

const router = express.Router();

router.get('/', (req, res) => {
    Attendance.find({}, null, {sort: {start: -1}}, (err, sessions) => {
        if (err) {
            res.send(err);
            return;
        }

        var present = [];
        var absent = [];
        var total = [];
        var time = [];
        var sessionTime = [];
        for (let j = 0; j < sessions.length; j++) {
            var points = sessions[j].data;
            var presentRow = [];
            var absentRow = [];
            var totalRow = [];
            var timeRow = [];

            for (let i = 0; i < points.length; i++) {
                const c = points[i];

                if (!c) {
                    continue;
                }

                var string = new Date(c.timestamp).toLocaleTimeString();
                presentRow.push(c.present);
                absentRow.push(c.absent);
                totalRow.push(c.total);
                timeRow.push(string);
            }

            present.push(presentRow);
            absent.push(absentRow);
            total.push(totalRow);
            time.push(timeRow);
            sessionTime.push({start: sessions[j].start, end: sessions[j].end});
        }

        res.render('index', {
            present: present,
            absent: absent,
            total: total,
            sessions: sessionTime,
            time: time
        });
    });
});

module.exports = router;
