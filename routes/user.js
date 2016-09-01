'use strict'
var express = require('express'),
    router = express.Router(),
    user = require('../models/user.js');

router.get('/register', function(req, res) {
    res.render('register')
})
router.get('/log-in', function(req, res) {
    res.render('login')
})

router.post('/register', user.register)

router.post('/log-in', user.login)

router.get('/log-out', user.logout)

module.exports = router
