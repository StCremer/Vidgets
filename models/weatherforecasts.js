'use strict'
const redis=require('redis');

module.exports.redisClient = redis.createClient()