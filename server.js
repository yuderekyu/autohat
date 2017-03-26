var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
// var config = require('./config.json');
var User = require('./app/models/user');
var directory = require('./directory.json');

/**@TODO implement database*/
// mongoose.connect('mongodb://'+config.mongodb.user + ':' + config.mongodb.password + '@ds141450.mlab.com:41450/router-attendance')
app.set('view engine', 'ejs');
/** Body parser turns data from CRUD operations to json*/
app.use(bodyParse.urlencoded({ extended: true}));
app.use(bodyParse.json());

var port = process.env.PORT || 8080;

/** Routes */
var router = express.Router();

router.route('/user')

        .post(function(req, res) {
          /**Loop through response*/
       var map = req.body;
       var length = Object.keys(map).length;
       var attendanceCount=0;
       for (var user in map){
           if(findMacAddress(user, attendanceCount)){
               attendanceCount++
           }
       }
        /**Save user to database */
        //    createUser(user, map); 
        //        user.save(function(err) {
        //            errorCheck(err, res);
        //         });
        
    // } 
        // res.json({message: 'Received users'});

        res.render('index', {
            attendanceCount: attendanceCount,
            total: length
        });
        
    })

    /**Get all users from database*/
    // .get(function(req, res) {
    //     User.find(function(err, users) {
    //         errorCheck(err, res);
    //         res.json(users);
    //     });
    // });

router.route('/').get(function(req, res){
   
    console.log(req);
    res.render('index');
});



/**Group routes under /api and register them */
app.use('/api', router);
app.use(logErrors);

app.listen(port);
console.log('Server running on port ' + port);

function findMacAddress(user){
    list = Object.keys(directory);
    for(key in list){
        if(user == list[key])
        return true;
    }
    return false;
}

/**Creates a new user from request */
// function createUser(user, map){
//     var newUser = User();
//     newUser.ip = map[user].ip;
//     newUser.mac = map[user].mac;
//     newUser.vendor = map[user].vendor;
//     newUser.timestamp = map[user].timestamp;
// }

/**Logs error stack */
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

/**Error checks request */
function errorCheck(err, res){
    if(err)
        res.send(err);
}