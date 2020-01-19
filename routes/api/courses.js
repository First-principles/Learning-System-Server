var router = require('express').Router();
const { RouteNames } = require("../../constants/constants");
const auth = require("../../helper/helper");
const AddCourse = require("../methods/courses");

router.post(RouteNames.AddCourse, auth.required, AddCourse);

module.exports = router;