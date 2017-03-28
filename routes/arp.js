var express = require('express');
var directory = require('../directory.json');

var router = express.Router();

/**
 * @TODO Parse arppush data, compare with directory
 */
router.post('/', (req, res) => {
        var map = req.body;
        var length = Object.keys(directory).length;
        for (var user in map) {
            if (helper.findMacAddress(user))
            //update attendance mongo db model
            res.json("aarpush succeeded");
        }
});

router.get('/', (req, res) => {
    res.json("test");
})

module.exports = router;