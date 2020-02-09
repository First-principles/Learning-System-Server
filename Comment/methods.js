var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var User = mongoose.model('User');
var Comment = mongoose.model("Comment");
var Lesson = mongoose.model("Lesson");
var Article = mongoose.model("Article");

const AddLessonComment = (req , res , next)=>{
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

const AddArtcileComment = (req , res , next)=>{
    const ArticleInfo = req.body.article;
    const CommentInfo = req.body.comment;
    if (!CommentInfo){
        res.status(422).send({error:{message:"please provide a comment"}})
    };
    if (!ArticleInfo){
        res.status(422).send({error:{message:"please provide a Article"}})
    };
    Article.findById(ArticleInfo._id).then(
        (article)=> {
            if (!article){return res.status(422).send({error:{message:"Lesson not found"}})}
            comment = new Comment(CommentInfo);
            article.comments.push(comment);
            article.save();
            comment.article = ArticleInfo;
            comment.save().then(
                ()=>{
                    res.status(202).send({
                        article:ArticleInfo,
                        comment
                    })
                }
            ).catch(next);
        }
    )
}

module.exports = { AddLessonComment ,AddArtcileComment };