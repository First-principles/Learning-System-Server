var mongoose = require('mongoose');
var Lesson = mongoose.model('Lesson');
var Course = mongoose.model('Course');
var User = mongoose.model('User');

const addlesson = (req, res, next) => {
    const LessonInfo = req.body.lesson;
    const CourseInfo = req.body.course;
    const UserInfo = req.body.user;
    if (!CourseInfo) {
        return res.status(422).send({ errors: { message: "Course not found" } });
    }
    if (!LessonInfo) {
        return res.status(422).send({ errors: { message: "Lesson not found" } });
    }
    if (!UserInfo) {
        return res.status(422).send({ errors: { message: "User not found" } });
    }
    User.findById(UserInfo._id).then((user)=>{
    Course.findOne(CourseInfo)
        .then(course => {
            if (!course) {
                res.status(422).send({ errors: { message: "Course not found" } });
            };
            if (!user) {
                res.status(422).send({ errors: { message: "User not found" } });
            };
            const lesson = new Lesson(LessonInfo);
            user.lessons.push(lesson);
            course.lessons.push(lesson);
            course.save();
            user.save();
            lesson.save().then(() => {
                res.status(202).send({ lesson });
            }).catch(next);
        }).catch(
            () => {
                return res.status(422).send({ errors: { message: "Course not found" } });
            }
        );
    })
};

const removelesson = (req, res, next) => {
    const LessonInfo = req.body.lesson;
    const CourseInfo = req.body.course;
    // const UserInfo = req.body.user;

    if (!CourseInfo) {
        return res.status(422).send({ errors: { message: "Course not found" } });
    }
    if (!LessonInfo) {
        return res.status(422).send({ errors: { message: "Lesson not found" } });
    }
    if (!UserInfo) {
        return res.status(422).send({ errors: { message: "User not found" } });
    }
    User.findById(UserInfo._id)
    .then((user)=>{
        Course.findById(CourseInfo._id).then((course)=>{
        if (!user) {
            return res.status(422).send({ errors: { message: "User not found" } });
        };
        if (!course) {
            return res.status(422).send({ errors: { message: "Course not found" } });
        };

        try {
        Lesson.deleteOne({_id:LessonInfo._id});
        user.lessons.splice(user.lessons.indexOf(LessonInfo._id),1);
        course.lessons.splice(course.lessons.indexOf(LessonInfo._id),1);
        user.save()
        course.save().then(()=>{
            return res.status(202).send({
                user:user.toAuthJSON(),
                course:course
            })
        }
        )
        }
        catch{
            return res.status(422).send({ errors: { message: "lesson couldn't be deleted" } });
        }
        }).catch(next)
    })
};

module.exports = {addlesson,removelesson};