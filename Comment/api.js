var router = require('express').Router();
const  Route = require("./constants");
const auth = require("../helper/helper");
const { AddLessonComment , AddArtcileComment } = require("./methods");

router.post(Route.AddComment2Lesson, auth.required, AddLessonComment);

router.post(Route.AddComment2Lesson, auth.required, AddArtcileComment);
 

module.exports = router;