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

module.exports.createUser = createUser;
