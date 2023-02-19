const { getChat, allChats, chatMemebers } = require('../controller/chat');

const route = require('express').Router()
route.post('/allChats', allChats)
route.post('/getChat', getChat);
route.get('/members/:id',chatMemebers)
module.exports = route