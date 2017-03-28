var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config.json');
var userRouter = require('./routes/user');
var arpRouter = require('./routes/arp');

mongoose.connect('mongodb://' + config.mongodb.user + ':' + config.mongodb.password + '@ds141450.mlab.com:41450/router-attendance');
app.set('view engine', 'ejs');

app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

var port = process.env.PORT || 8080;

/**
* Display homepage
*/

app.get('/',(req, res) => {
    res.render('index', {
        attendanceCount:'',
        total: ''
    });
});

app.get('/register', (req, res) => {
    res.render('register');
})

app.use('/api/user', userRouter);
app.use('/api/arppush', arpRouter);
app.use(logErrors);   
app.listen(port);
console.log('Server running on port ' + port);

/** Logs error stack */
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
