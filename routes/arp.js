var express = require('express');
var directory = require('../directory.json');
var helper = require('../helpers/arp');

var router = express.Router();

/**
 * Parse arppush data and create attendance model
 */
router.post('/', (req, res) => {
    var blob = req.body;
    helper.findMacAddresses(blob, err => {
        if (err) {
            res.send(err);
            return;
        }

        res.send({success:true});

    });
});

module.exports = router;
