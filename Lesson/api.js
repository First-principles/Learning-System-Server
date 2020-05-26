var router = require('express').Router();
const helper = require("../helper/helper");
const  Route = require("./constants");
const Controler = require('./methods');

//SECTION Add a lesson to a course
router.post(Route.Lesson, helper.required, Controler.addlesson);

//SECTION Remove a lesson to a course
router.delete(Route.Lesson, helper.required, Controler.removelesson);

module.exports = router;