var router = require('express').Router();
const { RouteNames } = require("../../constants/constants");
const auth = require("../../helper/helper");
const { AddCourse, RemoveCourse } = require("../methods/courses");

router.post(RouteNames.AddCourse, auth.required, AddCourse);
<<<<<<< HEAD
// router.delete(RouteNames.AddCourse, auth.required, RemoveCourse);

=======
router.delete(RouteNames.AddCourse, auth.required, RemoveCourse);
>>>>>>> master

module.exports = router;