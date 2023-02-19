const { allMessages, sendMessage, updateLast } = require('../controller/message');

const route = require('express').Router()

route.post('/', allMessages);
route.post('/send', sendMessage)
route.post('/update',updateLast)
module.exports = route