var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
const { adduser, login , updateUser ,followUser } = require('./methods');
const {params , userPopulation} = require('./populations');
const Routes = require("./constants");
const helper = require("../helper/helper");
router.param(params.user,userPopulation);

//SECTION add user
router.post(Routes.AddUser, adduser);

//SECTION user login 
router.post(Routes.Login, login);

//SECTION update user
router.post(Routes.update , helper.required , updateUser);


//SECTION update user
router.post(Routes.follow , helper.required , followUser);

module.exports = router;