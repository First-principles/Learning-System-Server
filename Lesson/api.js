var router = require('express').Router();
const helper = require("../helper/helper");
const { coursePopulation , params } = require('./populations');
const  Route = require("./constants");
const {addlesson,removelesson} = require('./methods');

//SECTION Add a lesson to a course
router.post(Route.Lesson, helper.required, addlesson);

//SECTION Remove a lesson to a course
router.delete(Route.Lesson, helper.required, removelesson);

module.exports = router;