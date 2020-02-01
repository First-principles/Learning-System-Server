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
            description: course.description,
            id: course.id
        });
    }).catch(next);
};

    const RemoveCourse = async(req, res, next) => {
    const courseInfo = req.body.course;
    if (!courseInfo) {
        res.status(422).send({ errors: { message: "Course not found" } });
    }

    Course.deleteOne({"_id": courseInfo.id})
        .then((course) => {
            if (!course){        
                res.status(422).send({ errors: { message: "Course is not found" } });
            }
            res.status(202).send({message: "Course has been deleted !" });
        })
        .catch(
            res.status(422).send({ errors: { message: "Course is not found" } })
            );
};

module.exports = { AddCourse, RemoveCourse };