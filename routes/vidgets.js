'use strict'
const express = require('express'),
    vidgets = require('../models/vidgets'),
    router = express.Router(),
    forecast= require('../models/forecast'),
    user = require('../models/user')

router.get('/vidgets/all', user.requreLogin, vidgets.allvidgets)

router.post('/vidget', user.requreLogin, vidgets.newVidget)

router.get('/vidget/:id', user.requreLogin, vidgets.getVidget)
router.put('/vidget/:id', user.requreLogin, vidgets.updateVidget,forecast.getForecast)
router.delete('/vidget/:id', user.requreLogin, vidgets.deleteVidget)



module.exports = router
