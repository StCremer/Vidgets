'use strict'
const express=require('express'),
router=express.Router(),
cities=require( '../models/cities'),
user=require('../models/user')

router.get('/',user.isLogined,cities.cityList)

module.exports=router