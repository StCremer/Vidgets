const fs = require('fs'),
    path= require('path')

var cities =fs.readFileSync(path.join(__dirname ,'../public/citylist.json'),'utf8').trim().split('\n')
// console.log('cities->', cities)
// console.log('typeof(cities)->',typeof(cities))
module.exports = cities
