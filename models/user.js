'use strict';
const redis = require('redis'),
    redisClient = redis.createClient,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});


var User = mongoose.model('User', new Schema({
    id: ObjectId,
    login: { type: String, unique: true },
    password: { type: String, },
    data: Object,
}));



module.exports.register = function(req, res) {
    console.log(req.body.name)
    var salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(req.body.password, salt)

    var user = new User({
        login: req.body.login,
        password: hash,
    });
    console.log(user)
    console.log("before user saeve")
    user.save(function(err) {
        if (err) {
            console.log(err)
            if (err.code === 11000) res.send('That Login is already taken, please try another.')
        } else {
            // utils.createUserSession(req, res, user);
            res.send('user ' + req.body.login + ' successfully created')
        }
    })
}

module.exports.login = function(req, res) {
    User.findOne({ login: req.body.login }, function(err, user) {
        if (!user) {
            console.log(user)
            res.send("---->Incorrect email / password.")
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user
                req.session.logged = true
                console.log(req.session.user)
                res.send("logged in")
            } else {
                req.session.destroy()
                res.send("Incorrect login / password.")
            }
        }
    })

}

module.exports.requreLogin = function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/log-in')
    } else {
        res.locals.user = req.session.user
        next()
    }
}

module.exports.isLogined = function(req, res, next) {
    if (req.session.user) {
        console.log('true')
        res.locals.user = req.session.user
    }
    next()
}

module.exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            res.send("Something bad happend and you weren/t logout")
        } else { res.send("logged out") }
    })
}
