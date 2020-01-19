var router = require('express').Router();
const { RouteNames } = require("../../constants/constants");
var mongoose = require('mongoose');
const addlesson = require('../methods/lessons');


router.post(RouteNames.AddLesson, addlesson);



module.exports = router;