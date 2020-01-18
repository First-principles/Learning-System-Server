var router = require('express').Router();
var mongoose = require('mongoose');
var Course = mongoose.model('Course');
//var User = mongoose.model('User');
const { RouteNames } = require("../../constants/constants");

router.post(RouteNames.AddCourse, (req, res, next) => {
    try {
        const course = new Course(req.body.course);
        course.save();
        res.status(202).send({ course });
    } catch (e) {
        res.status(400).send({ error: { message: "couldn't save Course" } });
    }
});



module.exports = router;