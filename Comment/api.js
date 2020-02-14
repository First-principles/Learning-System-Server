var router = require('express').Router();
const  Route = require("./constants");
const auth = require("../helper/helper");
const { AddLessonComment , AddArticleComment  , AddCourseComment} = require("./methods/add");
const { RemoveArticleComment , RemoveLessonComment } = require("./methods/Delete");

//SECTION Commment on a lesson
router.post(Route.AddComment2Lesson, auth.required, AddLessonComment);

//SECTION Commment on an article
router.post(Route.AddComment2Article, auth.required, AddArticleComment);

//SECTION Commment on an article
router.post(Route.AddComment2Course, auth.required, AddCourseComment);

//SECTION delete Commment on an article
router.delete(Route.AddComment2Course, auth.required, RemoveArticleComment);

//SECTION delete Commment on an lesson
router.delete(Route.AddComment2Lesson, auth.required, RemoveLessonComment);

module.exports = router;