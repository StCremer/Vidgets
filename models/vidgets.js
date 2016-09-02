'use strict'
const request = require('request'),
    redisData = require('./RedisData'),
    redisClient = redisData.redisClient,
    redis = require('redis'),
    express = require('express')

module.exports.allvidgets = (req, res) => {
    let usersVidgets = []
    redisClient.select(2)
    redisClient.smembers(req.session.user.login, (err, reply) => {
        if (err) {
            console.log(err)
            return
        }
        redisClient.select(1)
        reply.forEach((vidgetid, ind, array) => {
            redisClient.hgetall(vidgetid, (err, reply) => {
                if (err) { console.log('err->', err) }
                usersVidgets.push(reply)
                if (ind + 1 === array.length) {
                    res.render('vidgets', { vidgets: usersVidgets })
                }
            })
        })

    })
}

module.exports.newVidget = (req, res, next) => {
    let id = new Date().valueOf()
    redisClient.select(1)

    redisClient.hmset(id, 'cityId', req.body.city, 'rangeofdates', req.body.rangeofdates, 'orientation', req.body.orientation, 'Vid', id, (err, reply) => {
        if (err) {
            console.log(err)
            return
        }
        if (req.session.user) {
            redisClient.select(2)
            redisClient.sadd(req.session.user.login, id, function(err, reply) {
                if (err) {
                    console.log('newVidget err->', err)
                    res.send("some erors happened and your vidget hasn't been saved")
                }
                res.locals.alertText = 'saved'
                next()
            })
        }
    })
}

module.exports.updateVidget = function(req, res, next) {
    let id = req.params.id
    redisClient.select(1)
    redisClient.hmset(id, 'cityId', req.body.city, 'rangeofdates', req.body.rangeofdates, 'orientation', req.body.orientation, 'Vid', id, (err, reply) => {
        if (err) {
            console.log('updateVidget err->', err)
            return
        }
        res.locals.alertText = 'vidget with id' + id + 'has been updated'
        next()
    })
}

module.exports.deleteVidget = (req, res) => {
    let id = req.params.id

    redisClient.select(1)
    redisClient.del(req.params.id, (err, reply) => {
        if (err) {
            console.log('deleteVidget del err->', err)
            return
        }
        redisClient.select(2)
        redisClient.srem(req.session.user.login, id, (err, reply) => {
            if (err) {
                console.log('deleteVidget srem err->', err)
                return
            }
            res.send('Vidjet has been deleted')
        })
    })
}


module.exports.getVidget = (req, res) => {

    console.log('req.body ->' + JSON.stringify(req.body));
    console.log('req.params.id ->', req.params.id);
    redisClient.select(1)
    redisClient.hgetall(req.params.id, (err, reply) => {
        if (err) {
            console.log('getVidget err->', err)
            return
        }
        res.render('editVidget', { vidget: reply, Vid: req.params.id })
    })

}
