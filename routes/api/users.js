var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
const { adduser, login } = require('../methods/users');

const { RouteNames } = require("../../constants/constants");

router.post(RouteNames.AddUser, adduser);

//SECTION login 
router.post(RouteNames.Login, login);

module.exports = router;