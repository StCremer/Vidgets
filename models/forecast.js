'use strict'
const request = require('request'),
    redisData = require('./RedisData'),
    redisClient = redisData.redisClient,
    redis = require('redis')


module.exports.getForecast = function(req, res) {
    redisClient.select(4)
    console.log('getForecast->', req.params.id)
    redisClient.get(req.params.id, function(err, reply) {
        if (err) {
            console.log('getForecast err->', err)
            return
        }
        console.log('getForecast reply->', reply)
        console.log('{forecast:JSON.parse(reply)}->', { forecast: JSON.parse(reply) })
        res.send({ forecast: JSON.parse(reply) })
    })
}
