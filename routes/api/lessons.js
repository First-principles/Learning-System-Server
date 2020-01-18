var router = require('express').Router();
var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');
//var User = mongoose.model('User');
const { RouteNames } = require("../../constants/constants");

router.post(RouteNames.AddLesson, (req, res, next) => {
    try {
        const lesson = new Lesson(req.body.lesson);
        res.status(202).send({ lesson });
    } catch (e) {
        res.status(400).send({ error: { message: "couldn't save lesson" } });
    }
});



module.exports = router;