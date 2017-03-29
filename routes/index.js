var express = require('express');

var Attendance = require('../models/attendance');

var router = express.Router();

router.get('/', (req, res) => {
    Attendance.find((err, points) => {
        var present = [];
        var absent = [];
        var total = [];
        var time = [];

        for (var i=points.length-100; i<points.length; i++) {
            var c = points[i];

            if (!c || !c.total) {
                continue;
            }

            var string = new Date(c.timestamp).toLocaleTimeString();
            present.push(c.present);
            absent.push(c.absent);
            total.push(c.total);
            time.push(string);
        }
        res.render('index', {
            present: JSON.stringify(present),
            absent: JSON.stringify(absent),
            total: JSON.stringify(total),
            time: time
        });
    });
});

module.exports = router;
