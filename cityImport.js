const fs = require('fs'),
    path= require('path'), 
    redis=require('redis'),
    client=redis.createClient();
    client.select(4)
var cities =fs.readFileSync(path.join(__dirname ,'./public/citylist.json'),'utf8').trim().split('\n').filter(function(city){return (JSON.parse(city)._id===524894||JSON.parse(city)._id===520555||JSON.parse(city)._id===536203)}),
citiesObj={}
console.log('typeOf(cities)->',typeof(cities))  
cities.forEach(function(city,ind,arr){
	let cityObj=JSON.parse(city)
	// console.log('city.name->',city)
	// console.log(typeof(city))  
	// console.log(typeof(cityObj)) 
	console.log('cityObj._id->',cityObj._id)  
	citiesObj[cityObj._id]=cityObj.name

	if(ind+1===arr.length){
		client.hmset('cities',citiesObj,function(err,rply){
			if(err){
				console.log(err)
				return 
			}
			console.log('citiesObj has been inserted.watch db 4 for cities') 
		})
	}
})