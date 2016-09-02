'use strict'
const request = require('request'),
    redisData = require('./RedisData'),
    redisClient = redisData.redisClient,
    redis = require('redis')


module.exports.getForecast = function(req, res) {
    redisClient.select(4)
    redisClient.get(req.params.id, function(err, reply) {
        if (err) {
            console.log('getForecast err->', err)
            return
        }
        res.send({alertText:res.locals.alertText, forecast: JSON.parse(reply) })
    })
}
