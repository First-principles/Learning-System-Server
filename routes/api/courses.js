var router = require('express').Router();
var mongoose = require('mongoose');
var Course = mongoose.model('Course');
//var User = mongoose.model('User');
const { RouteNames } = require("../../constants/constants");

router.post(RouteNames.AddCourse, (req, res, next) => {
    const course = new Course();
    try {
        course.title = req.body.course.title;
        course.description = req.body.description;

    } catch (e) {
        res.status(400).send({ error: { message: "couldn't save Course" } });
    }
    course.save().then(() => {
        res.status(202).send({ course });
    }).catch(next);

});



module.exports = router;