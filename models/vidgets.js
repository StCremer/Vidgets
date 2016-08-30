'use strict'
const request = require('request'),
    redis = require('redis'),
    express = require('express'),
    async = require('async')

module.exports.allvidgets = function(req, res) {
    console.log('res->', res)
    console.log('req->', req)
    let vidgetsAll = []
    let redisClient = redis.createClient()
    redisClient.select(1)
    redisClient.keys('*', function(err, reply) {
        if (err) {
            console.log(err)
            res.end('Top vidgets not currently available, please check back');
            return;
        }

        reply.forEach(function(key, ind, array) {
            redisClient.hgetall(key, function(err, reply) {
                if (err) { console.log('err->', err) }
                vidgetsAll.push(reply)
                if (ind + 1 === array.length) {
                    console.log('vidgetsAll->', vidgetsAll)
                    console.log('typeOf vidgetsAll->', typeof(vidgetsAll))
                    res.render('vidgets', { vidgets: vidgetsAll })
                }
            })
        })
    })
}

module.exports.newVidget = function(req, res) {
    let redisClient = redis.createClient(),
        id = new Date().valueOf()
    redisClient.select(1)

    redisClient.hmset(id, 'cityId', req.body.city, 'rangeofdates', req.body.rangeofdates, 'orientation', req.body.orientation, 'Vid', id, function(err, reply) {
        if (err) {
            console.log(err)
            return
        }
        if (req.session.user) {
            redisClient.select(2)
            redisClient.sadd(req.session.user.login, id, redis.print)
            res.end('saved')
        }
    })
}

module.exports.updateVidget = function(req, res) {
    let redisClient = redis.createClient(),
        id = req.params.id

    redisClient.select(1)
    redisClient.hmset(id, 'cityId', req.body.city, 'rangeofdates', req.body.rangeofdates, 'orientation', req.body.orientation, 'Vid', id, function(err, reply) {
        if (err) {
            console.log(err)
            return
        }
        res.send('saved')

    })
}

module.exports.deleteVidget = function(req, res) {
    let redisClient = redis.createClient(),
        id = req.params.id

    redisClient.select(1)
    redisClient.del(req.params.id, function(err, reply) {
        if (err) {
            console.log(err)
            return
        }
        redisClient.select(2)
        redisClient.srem(req.session.user.login, id, function(err, reply) {
            if (err) {
                console.log(err)
                return
            }
            res.send('Vidjet has been deleted')
        })
    })
}


module.exports.getVidget = function(req, res) {

    console.log('req.body ->' + JSON.stringify(req.body));
    console.log('req.params.id ->', req.params.id);

    let redisClient = redis.createClient()
    redisClient.select(1)
    redisClient.hgetall(req.params.id, function(err, reply) {
        console.log('reply->', reply)
        if (err) {
            console.log(err)
            return
        }

        res.render('editVidget', { vidget: reply, Vid: req.params.id })
    })

}
