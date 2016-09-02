const redis = require('redis'),
    request = require('request')
client = redis.createClient();
client.select(4);

function insertDada() {
    client.hkeys('cities', (err, reply) => {
        if (err) {
            console.log(err)
            return
        }
        reply.forEach(cityid => {
            let weatherObj = {}
            request.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=' + cityid + '&cnt=7&units=metric&lang=ru&APPID=f2dadcd28fb0f97c3c249b050975a9d4', function(err, response, body) {
                if (err) {
                    console.log('err->', err)
                }
                if (!err && response.statusCode == 200) {
                    client.set(cityid, body, (err, reply) => {
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
}
insertDada()
var dateNow = new Date(),
    year = dateNow.getFullYear(),
    month = dateNow.getMonth(),
    day = dateNow.getDay(),
    dateTomorrow = new Date(year, month, day + 1, 12)

setTimeout(() => {
    setInterval(insertDada, 86400000)
}, dateTomorrow.valueOf() - dateNow.valueOf())

