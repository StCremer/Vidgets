'use strict';
const express = require('express'),
    http = require('http'),
    routes = require('./routes'),
    app = express(),
    util = require('util'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    path = require('path'),
    redis = require('redis'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    autoprefixer = require('autoprefixer-stylus'),
    csso = require('csso-stylus');

app.disable('x-powered-by');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(favicon(__dirname +'/public/images/ico2.png'));
app.use(morgan('dev'));
app.use(stylus.middleware({
    src: __dirname + '/stylesheets',
    dest: __dirname + '/public/stylesheets',
    debug: true,
    compile: function(str, path) {
        return stylus(str)
            .use(autoprefixer())
            .use(csso())
            .set('filename', path)
            .set('compress', true)
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: 'Lingia[ART]',
    store: new RedisStore({
        // host: '127.0.0.1',
        db: 0
    }),
    secret: 'xfgncfgncfgn'
}));

app.use(require('./routes/index'))
app.use(require('./routes/user'))
app.use(require('./routes/vidgets'))

var server = http.createServer(app).listen(3000, function() {

    console.log('server running at port 3000');
});
