var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
const { adduser, login , updateUser } = require('../methods/users');
const {params , userPopulation} = require('../populations/populations');
const { RouteNames } = require("../../constants/constants");
const helper = require("../../helper/helper");
router.param(params.user,userPopulation);

//SECTION add user
router.post(RouteNames.AddUser, adduser);

//SECTION user login 
router.post(RouteNames.Login, login);

//SECTION update user
router.post(RouteNames.update , helper.required , updateUser);

module.exports = router;