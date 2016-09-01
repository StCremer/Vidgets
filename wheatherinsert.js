const redis = require('redis'),
    request = require('request')
client = redis.createClient();
client.select(4)

client.hkeys('cities', function(err, reply) {
        if (err) {
            console.log(err)
            return
        }
        reply.forEach(function(cityid) {
            let weatherObj = {}
            request.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=' + cityid + '&cnt=7&units=metric&lang=ru&APPID=f2dadcd28fb0f97c3c249b050975a9d4', function(err, response, body) {
                if (err) {
                    console.log('err->', err)
                }
                if (!err && response.statusCode == 200) {
                    client.set(cityid, body, function(err, reply) {
                        if (err) {
                            console.log('err->', err)
                            return
                        }
                        console.log('day with id:', cityid, 'added to database')

                    })
                }
            })
        })
    })
    // let obj = JSON.parse(body),
    //     daysList = obj.list

//     weatherObj['cityName']=obj.city.name
//     weatherObj['cityId']=obj.city.id

// daysList.forEach(function(day,ind,arr) {
//     weatherObj['day.'+(ind+1)+'.date']=day.dt
//     weatherObj['day.'+(ind+1)+'.temp']=day.temp.day
//     if(ind+1===arr.length){
//      console.log('weatherObj->',weatherObj) 
//      })
//     }
