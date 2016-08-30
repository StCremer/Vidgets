'use strict'
const express=require('express'),
router=express.Router(),
cities=require( '../models/cities'),
user=require('../models/user')

// console.log(cities)

router.get('/',user.isLogined,function(req,res){
	res.render('getVidget',{cities: cities})
})

module.exports=router