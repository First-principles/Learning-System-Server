var router = require('express').Router();
var mongoose = require('mongoose');
var Course = mongoose.model('Course');
//var User = mongoose.model('User');
const { RouteNames } = require("../../constants/constants");
const auth = require("../../helper/helper");

router.post(RouteNames.AddCourse, auth.required, (req, res, next) => {
    const course = new Course();
    const courseInfo = req.body.course;
    try {
        course.title = courseInfo.title;
        course.description = courseInfo.description;
    } catch (e) {
        console.log(e);
    }
    //console.log(courseInfo);
    course.save().then(() => {
        res.status(202).send({
            title: course.title
        });
    }).catch(next);

});



module.exports = router;