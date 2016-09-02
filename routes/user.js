'use strict'
var express = require('express'),
    router = express.Router(),
    user = require('../models/user.js');

router.get('/register', (req, res) => { res.render('register') })
router.post('/register', user.register)

router.get('/log-in', (req, res) => { res.render('login') })
router.post('/log-in', user.login)

router.get('/log-out', user.logout)

module.exports = router
