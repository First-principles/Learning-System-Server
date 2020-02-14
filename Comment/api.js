var router = require('express').Router();
const  Route = require("./constants");
const auth = require("../helper/helper");
const { AddLessonComment , AddArticleComment  , AddCourseComment} = require("./methods/add");
const { RemoveArticleComment , RemoveLessonComment , RemoveCourseComment } = require("./methods/Delete");

//SECTION Commment on a lesson
router.post(Route.Comment2Lesson, auth.required, AddLessonComment);

//SECTION Commment on an article
router.post(Route.Comment2Article, auth.required, AddArticleComment);

//SECTION Commment on an Course
router.post(Route.Comment2Course, auth.required, AddCourseComment);

//SECTION delete Commment on an article
router.delete(Route.Comment2Course, auth.required, RemoveArticleComment);

//SECTION delete Commment on an lesson
router.delete(Route.Comment2Lesson, auth.required, RemoveLessonComment);

//SECTION delete Commment on an Course
router.delete(Route.Comment2Course, auth.required, RemoveCourseComment);

module.exports = router;