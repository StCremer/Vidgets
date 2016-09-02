const fs = require('fs'),
    path= require('path'),
     redisData = require('./RedisData'),
    redisClient = redisData.redisClient

module.exports.cityList=(req,res)=>{
redisClient.select(4)
redisClient.hgetall('cities',(err,reply)=>{
	if(err) {console.log(err)
		return} 
	res.render('getVidget',{page_name:'Get Weather', cities: reply})
})
}
