'use strict'
var redis = require('redis');

module.exports.redisClient = redis.createClient()
