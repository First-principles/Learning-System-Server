var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var User = mongoose.model('User');
var Comment = mongoose.model("Comment");

const AddComment = (req , res , next)=>{
    const LessonInfo = req.body.lesson;
    const CommentInfo = req.body.comment; 
    if (!CommentInfo){
        res.status(422).send({error:{message:"please provide a comment"}})
    }
    if (!LessonInfo){
        res.status(422).send({error:{message:"please provide a lesson"}})
    }

};


module.exports = { AddComment };