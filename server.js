var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config.json');
var userRouter = require('./routes/user');
var arpRouter = require('./routes/arp');
var indexRouter = require('./routes/index');


const url = process.env.MONGODB_URI || 'mongodb://' + config.mongodb.user + ':' + config.mongodb.password + '@ds143990.mlab.com:43990/' + config.mongodb.database;
mongoose.connect(url);
app.set('view engine', 'ejs');

app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

var port = process.env.PORT || 8080;

/**
* Display homepage
*/

app.use('/', indexRouter);

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
