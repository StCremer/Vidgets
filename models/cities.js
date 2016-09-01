const fs = require('fs'),
    path= require('path'),
     redisData = require('./RedisData'),
    redisClient = redisData.redisClient

module.exports.cityList=function(req,res){
redisClient.select(4)
redisClient.hgetall('cities',function(err,reply){
	if(err) {console.log(err)
		return}
	console.log(typeof(reply),'->',reply) 
	res.render('getVidget',{page_name:'Get Weather', cities: reply})
})
}
