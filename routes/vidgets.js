'use strict'
const express = require('express'),
vidgets=require('../models/vidgets'),
router=express.Router(),
user=require('../models/user')

router.get('/vidgets/all',user.requreLogin,vidgets.allvidgets)
router.get('/vidget/:id',user.requreLogin,vidgets.getVidget)

// router.put('/vidget/:id',user.requreLogin,vidgets.allvidgets)

router.post('/vidget',user.requreLogin,vidgets.newVidget)

router.put('/vidget/:id',user.requreLogin,vidgets.updateVidget)
router.delete('/vidget/:id',user.requreLogin,vidgets.deleteVidget)
module.exports=router