var express = require('express');
var directory = require('../directory.json');
var helper = require('../helpers/arp');

var router = express.Router();

router.post('/start', (req, res) => {
    const blob = req.body;
    helper.startAttendance(blob, err => {
        if (err) {
            res.send({success: false, err: err.message});
            return;
        }

        res.send({success: true});
    });
});

router.post('/stop', (req, res) => {
    const blob = req.body;
    helper.stopAttendance(blob, err => {
        if (err) {
            res.send({success: false, err: err.message});
            return;
        }

        res.send({success: true});
    });
});

/**
 * Parse arppush data and create attendance model
 */
router.post('/', (req, res) => {
    const blob = req.body;
    helper.findMacAddresses(blob, err => {
        if (err) {
            res.send(err);
            return;
        }

        res.send({success:true});

    });
});

module.exports = router;
