var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');
var requestIp = require('request-ip');
var passport = require('passport');

var routes = require('./routes/index');

var app = express();


var allowCrossDomain = function(req, res, next) {
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }

    //res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.header('Access-Control-Allow-Headers', '*');
    //
    //next();
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(allowCrossDomain);
app.use(cookieParser());
app.use(session({
    secret: 'ghw462~!@#$%^&*()_+|', // just a long random string
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

process.env.TMP = path.join(__dirname, './temp');
process.env.TEMP = path.join(__dirname, './temp');
process.env.TMPDIR = path.join(__dirname, './temp');

// var multiparty = require('connect-multiparty');
// app.use(multiparty())
// app.use('/', routes);


// global.appRoot = path.resolve(__dirname);


process.on('uncaughtException', function (err) {
    console.log("Ooops~~~~~~~uncaughtException = " + err.stack);
});

var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.Promise = promise;
var mongooseConnectionString = 'mongodb://localhost/mockupdb';
var options = {
    user: 'admin',
    pass: 'mockuppass'
};

mongoose.connect(mongooseConnectionString, options, function (err) {
    console.log("mongoose trying to connect to mongodb : " + mongooseConnectionString);
    if (err) {
        console.log('mongoose connection error :' + err);
        throw err;
    } else {
        console.log('success');
    }
});

process.on('uncaughtException', function (err) {
    console.log("Ooops~~~~~~~uncaughtException = " + err.stack);
});


/*******************
 * API List
 ******************/


var logController = require('./controllers/log');
app.post('/log/addLog', logController.addLog);
app.get('/log/getAllLogs', logController.getAllLogs);

app.use(requestIp.mw({ attributeName : 'myCustomAttributeName' }))
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.json({
        'error': {
            message: err.message,
            error: {}
        }
    });
});


module.exports = app;
