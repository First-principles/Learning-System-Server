var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');
var Course = mongoose.model('Course');


const addlesson = (req, res, next) => {
    const LessonInfo = req.body.lesson;
    const CourseInfo = req.body.course;

    Course.findById(LessonInfo.CourseID)
        .then(course => {
            if (!course) {
                res.status(422).send({ errors: { message: "Course not found" } });
            }
            const lesson = new Lesson(LessonInfo);

            course.lessons.push(lesson);
            lesson.save().then(() => {
                res.status(202).send({ lesson });
            }).catch(next);

        }).catch(() => {
            res.status(422).send({ errors: { message: "Course not found" } });
        });
};

module.exports = addlesson;