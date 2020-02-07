var router = require('express').Router();
const addlesson = require('./methods');
const helper = require("../helper/helper");
const { coursePopulation , params } = require('./populations');
const  Route = require("./constants");

router.param(params.comment, coursePopulation);

router.post(Route.AddLesson, helper.required, addlesson);

module.exports = router;