'use strict'
const request = require('request'),
    redisData = require('./RedisData'),
    redisClient = redisData.redisClient,
    redis = require('redis'),
    express = require('express')

module.exports.allvidgets = function(req, res) {
    let usersVidgets = []
    console.log('res->', res)
    console.log('req->', req)
    redisClient.select(2)
    redisClient.smembers(req.session.user.login, function(err, reply) {
        if (err) {
            console.log(err)
            return
        }
        redisClient.select(1)
        reply.forEach(function(vidgetid, ind, array) {
                redisClient.hgetall(vidgetid, function(err, reply) {
                    if (err) { console.log('err->', err) }
                    usersVidgets.push(reply)
                    if (ind + 1 === array.length) {
                        console.log('vidgetsAll->', usersVidgets)
                        res.render('vidgets', { vidgets: usersVidgets })
                    }
                })
            })

        })


        // redisClient.select(1)
        // redisClient.keys('*', function(err, reply) {
        //     if (err) {
        //         console.log(err)
        //         res.end('Top vidgets not currently available, please check back');
        //         return;
        //     }

        //     reply.forEach(function(key, ind, array) {
        //         redisClient.hgetall(key, function(err, reply) {
        //             if (err) { console.log('err->', err) }
        //             vidgetsAll.push(reply)
        //             if (ind + 1 === array.length) {
        //                 console.log('vidgetsAll->', vidgetsAll)
        //                 console.log('typeOf vidgetsAll->', typeof(vidgetsAll))
        //                 res.render('vidgets', { vidgets: vidgetsAll })
        //             }
        //         })
        //     })
        // })
}

module.exports.newVidget = function(req, res,next) {
    let id = new Date().valueOf()
    redisClient.select(1)

    redisClient.hmset(id, 'cityId', req.body.city, 'rangeofdates', req.body.rangeofdates, 'orientation', req.body.orientation, 'Vid', id, function(err, reply) {
        if (err) {
            console.log(err)
            return
        }
        if (req.session.user) {
            redisClient.select(2)
            redisClient.sadd(req.session.user.login, id,function(err,reply){
            	if(err){console.log('err->',err)
            		res.send("some erors happened and your vidget hasn't been saved")
            	}
            res.locals.alertText='saved'
        	next()
            })
        }
    })
}

module.exports.updateVidget = function(req, res) {
    let id = req.params.id
    console.log('updateVidget-cityId', req.body.city, 'rangeofdates', req.body.rangeofdates, 'orientation', req.body.orientation) 
    redisClient.select(1)
    redisClient.hmset(id, 'cityId', req.body.city, 'rangeofdates', req.body.rangeofdates, 'orientation', req.body.orientation, 'Vid', id, function(err, reply) {
        if (err) {
            console.log(err)
            return
        }
        console.log('updateVidget reply->',reply) 
        res.send('saved')

    })
}

module.exports.deleteVidget = function(req, res) {
    let id = req.params.id

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
