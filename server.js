const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const arpRouter = require('./routes/arp');
const indexRouter = require('./routes/index');

const app = express();

try {
    const config = require('./config.json');
    const url = 'mongodb://' + config.mongodb.user + ':' + config.mongodb.password + '@ds143990.mlab.com:43990/' + config.mongodb.database;
    mongoose.connect(url);
} catch (err) {
    console.log('Config file does not exist');
    const url = process.env.MONGO_URI;
    mongoose.connect(url);
}

app.set('view engine', 'ejs');

app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

const port = process.env.PORT || 8080;

/**
* Display homepage
*/

app.use('/', indexRouter);

app.get('/register', (req, res) => {
    res.render('register');
});

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
