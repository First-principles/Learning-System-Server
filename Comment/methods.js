var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var User = mongoose.model('User');
var Comment = mongoose.model("Comment");
var Lesson = mongoose.model("Lesson");
const AddComment = (req , res , next)=>{
    const LessonInfo = req.body.lesson;
    const CommentInfo = req.body.comment;
    if (!CommentInfo){
        res.status(422).send({error:{message:"please provide a comment"}})
    };
    if (!LessonInfo){
        res.status(422).send({error:{message:"please provide a lesson"}})
    };
    Lesson.findById(LessonInfo._id).then(
        (lesson)=> {
            comment = new Comment(CommentInfo)
            if (!lesson){return res.status(422).send({error:{message:"Lesson not found"}})}
            lesson.comments.push(comment);
            comment.lesson = LessonInfo;
            comment.save().then(
                ()=>{
                    res.status(202).send({
                        lesson:LessonInfo,
                        comment
                    })
                }
            ).catch(next);
            lesson.save();
        }
    )
};


module.exports = { AddComment };