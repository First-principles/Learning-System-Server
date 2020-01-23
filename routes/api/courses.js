var router = require('express').Router();
const { RouteNames } = require("../../constants/constants");
const auth = require("../../helper/helper");
const { AddCourse, RemoveCourse } = require("../methods/courses");

router.post(RouteNames.AddCourse, auth.required, AddCourse);
// router.delete(RouteNames.AddCourse, auth.required, RemoveCourse);
router.delete(RouteNames.AddCourse, auth.required, RemoveCourse);

module.exports = router;