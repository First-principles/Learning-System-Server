var router = require('express').Router();
const  Route = require("./constants");
const auth = require("../helper/helper");
const { AddLessonComment , AddArtcileComment } = require("./methods");

//SECTION Commment on a lesson
router.post(Route.AddComment2Lesson, auth.required, AddLessonComment);

//SECTION Commment on an article
router.post(Route.AddComment2Article, auth.required, AddArtcileComment);
 
module.exports = router;