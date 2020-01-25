var mongoose = require('mongoose');
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");
var Lesson = mongoose.model("Lesson");
var Course = mongoose.model("Course");

const course = function(req, res, next, slug) {
    const courseInfo = req.body.course;
    Course.findOne(courseInfo)
        .populate('author')
        .then(function(course) {
            if (!course) {
                return res.sendStatus(404);
            }
            req.course = course;
            return next(); //MiddleWare
        }).catch(next);
};

const comment = (req, res, next, id) => {
    Comment.findById(id).then(function(comment) {
        if (!comment) {
            return res.sendStatus(404);
        }
        req.comment = comment;
        return next();
    }).catch(ncommentext);
};

const params = {
    course: 'course',
    comment: 'comment'
};


module.exports = { course, comment, params };