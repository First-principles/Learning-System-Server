var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');
var Course = mongoose.model('Course');


const addlesson = (req, res, next) => {
    const LessonInfo = req.body.lesson;
    const CourseInfo = req.body.course;
    const lesson = new Lesson(LessonInfo);

    Course.findOne(CourseInfo)
        .then(course => {
            course.lessons.push(lesson);
        }).catch(() => {
            res.status(422).send({ errors: { message: "Course not found" } });
        });
    lesson.save().then(() => {
        res.status(202).send({ lesson });
    }).catch(next);
};

module.exports = addlesson;