var mongoose = require('mongoose');
var User = mongoose.model('User');
var Course = mongoose.model('Course');
var Comment = mongoose.model("Comment");
var Lesson = mongoose.model("Lesson");
var Article = mongoose.model("Article");

//SECTION remove comment on a lesson
const RemoveLessonComment = (req , res , next)=>{
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
            if (!lesson){return res.status(422).send({error:{message:"Lesson not found"}})}
            Comment.deleteOne({_id:CommentInfo._id});

            lesson.comments.splice(lesson.comments.indexOf(CommentInfo._id),1);

            lesson.save().then(
                ()=>{
                    res.status(202).send({
                        lesson:LessonInfo,
                    })
                }
            ).catch(next);
        }
    )
};

//SECTION remove comment on an Article
const RemoveArticleComment = (req , res , next)=>{
    const ArticleInfo = req.body.article;
    const CommentInfo = req.body.comment;

    if (!CommentInfo){
        res.status(422).send({error:{message:"please provide a comment"}})
    };
    if (!ArticleInfo){
        res.status(422).send({error:{message:"please provide an article"}})
    };
    Article.findById(ArticleInfo._id).then(
        (article)=> {
            if (!article){return res.status(422).send({error:{message:"article not found"}})}
            Comment.deleteOne({_id:CommentInfo._id});

            article.comments.splice(article.comments.indexOf(CommentInfo._id),1);

            article.save().then(
                ()=>{
                    res.status(202).send({
                        article:ArticleInfo
                    })
                }
            ).catch(next);
        }
    )
};

//SECTION remove comment on an Course
const RemoveCourseComment = (req , res , next)=>{
    const CourseInfo = req.body.course;
    const CommentInfo = req.body.comment;

    if (!CommentInfo){
        res.status(422).send({error:{message:"please provide a comment"}})
    };
    if (!CourseInfo){
        res.status(422).send({error:{message:"please provide a course"}})
    };
    Course.findById(CourseInfo._id).then(
        (course)=> {
            if (!course){return res.status(422).send({error:{message:"course not found"}})}
            Comment.deleteOne({_id:CommentInfo._id});

            course.comments.splice(course.comments.indexOf(CommentInfo._id),1);

            course.save().then(
                ()=>{
                    res.status(202).send({
                        course:CourseInfo
                    })
                }
            ).catch(next);
        }
    )
};

module.exports = {RemoveLessonComment , RemoveArticleComment ,RemoveCourseComment }