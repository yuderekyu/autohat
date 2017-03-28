var directory = require('../directory.json');
var User = require('../models/user');

/** 
 * Creates a new user from submission form
 * @returns User
 */
var createUser = req => {
    var newUser = User();
    newUser.email = req.body.email;
    newUser.mac = req.body.mac;
    return newUser;
};

/** 
 * Searches for the designated user within directory.json
 * @returns boolean
 */
var findMacAddress = user => {
    var list = Object.keys(directory);
    for (var key in list) {
        if (user == list[key])
            return true;
    }
    return false;
};

module.exports.createUser = createUser;
module.exports.findMacAddress = findMacAddress;