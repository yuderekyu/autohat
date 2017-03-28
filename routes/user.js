var express = require('express');

var User = require('../models/user');
var uHelper = require('../helpers/user.js');

/**
* Routes
*/
var router = express.Router();

/**
* Create user
*/
router.post('/', (req, res) => {
	var user = uHelper.createUser(req);
	user.save(err => {
        if (err) {
            res.send(err);
        }
    });
        
        res.json({message: 'User successfully created'});
    })
    
/**
* Get all users from database
*/
router.get('/', (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
        });
    });


module.exports = router;