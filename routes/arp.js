var express = require('express');
var directory = require('../directory.json');
var helper = require('../helpers/arp');

var router = express.Router();

/**
 * Parse arppush data and create attendance model
 */
router.post('/', (req, res) => {
    var blob = req.body;
    var attendance = helper.findMacAddresses(blob);
    attendance.save(err => {
        if (err)
            res.send(err);
    });
    res.render('index', {
        present: attendance.present,
        total: attendance.total
    })        
});

module.exports = router;