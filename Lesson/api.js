var router = require('express').Router();
const { RouteNames } = require("../constants/constants");
var mongoose = require('mongoose');
const addlesson = require('./methods');
const helper = require("../helper/helper");
const { coursePopulation , params } = require('./populations');

router.param(params.comment, coursePopulation);

router.post(RouteNames.AddLesson, helper.required, addlesson);

module.exports = router;