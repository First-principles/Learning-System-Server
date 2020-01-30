var mongoose = require('mongoose');
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");
var Lesson = mongoose.model("Lesson");
var Course = mongoose.model("Course");

const coursePopulation = function(req, res, next, slug) {
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

const commentPopulation = (req, res, next, id) => {
    Comment.findById(id).then(function(comment) {
        if (!comment) {
            return res.sendStatus(404);
        }
        req.comment = comment;
        return next();
    }).catch(ncommentext);
};

const userPopulation = (eq, res, next, id)=>{
    User.findById(id)
    .then((usr)=>{
        if (!usr) {
            return res.sendStatus(404);
        }
        req.user = usr;
    })
    .catch(next)
}


const params = {
    course: 'course',
    comment: 'comment',
    user:'user'
};


module.exports = { coursePopulation, commentPopulation ,userPopulation, params };