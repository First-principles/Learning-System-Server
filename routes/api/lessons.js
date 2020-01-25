var router = require('express').Router();
const { RouteNames } = require("../../constants/constants");
var mongoose = require('mongoose');
const addlesson = require('../methods/lessons');
const helper = require("../../helper/helper");
const { course, params } = require('../populations/populations');

router.param(params.comment, course);


router.post(RouteNames.AddLesson, helper.required, addlesson);

module.exports = router;