'use strict'
const express = require('express'),
    router = express.Router(),
    user = require('../models/user'),
    vidgets = require('../models/vidgets'),
    forecast = require('../models/forecast')

router.get('/forecast/:id', user.isLogined, forecast.getForecast)
router.post('/forecast/:id', user.isLogined, vidgets.newVidget, forecast.getForecast)

module.exports = router
