var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var User = mongoose.model('User');

const AddCourse = (req, res, next) => {
    const course = new Course();
    const courseInfo = req.body.course;
    try {
        course.title = courseInfo.title;
        course.description = courseInfo.description;
    } catch (e) {}
    course.save().then(() => {
        res.status(202).send({
            title: course.title,
            description: course.description
        });
    }).catch(next);
};

const RemoveCourse = (req, res, next) => {
<<<<<<< HEAD

};

=======
    Course.deleteOne(course);
};


>>>>>>> master
module.exports = { AddCourse, RemoveCourse };