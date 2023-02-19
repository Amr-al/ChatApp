const { login, signup, getFriends } = require('../controller/auth');

const route = require('express').Router()

route.post('/login', login);
route.post('/signup', signup);
route.post('/friends', getFriends);

module.exports = route