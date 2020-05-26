const mongoose = require("mongoose");
const User = mongoose.model("User");
const Comment = mongoose.model("Comment");
const Lesson = mongoose.model("Lesson");
const Course = mongoose.model("Course");
const Article = mongoose.model("Article");

const userPopulation = (eq, res, next, _id) => {
  User.findOne({ _id: _id })
    .then((user) => {
      if (!usr) {
        return res.sendStatus(404);
      }
      req.user = user;
    })
    .catch(next);
};

const coursePopulation = function (req, res, next, _id) {
  Course.findOne({ _id: _id })
    .populate("author")
    .then(function (course) {
      if (!course) {
        return res.sendStatus(404);
      }
      req.course = course;
      return next(); //MiddleWare
    })
    .catch(next);
};

const lessonPopulation = function (req, res, next, _id) {
  Lesson.findOne({ _id: _id })
    .populate("author")
    .then(function (lesson) {
      if (!lesson) {
        return res.sendStatus(404);
      }
      req.lesson = lesson;
      return next(); //MiddleWare
    })
    .catch(next);
};

const articlePopulation = (eq, res, next, _id) => {
  Article.findOne({ _id: _id })
    .then((article) => {
      if (!article) {
        return res.sendStatus(404);
      }
      req.article = article;
    })
    .catch(next);
};

const commentPopulation = (req, res, next, _id) => {
  Comment.findOne({ _id: _id })
    .then(function (comment) {
      if (!comment) {
        return res.sendStatus(404);
      }
      req.comment = comment;
      return next();
    })
    .catch(ncommentext);
};

const params = {
  course: "course",
  comment: "comment",
  user: "user",
  lesson: "lesson",
  article: "article",
};

module.exports = {
  coursePopulation,
  commentPopulation,
  userPopulation,
  articlePopulation,
  lessonPopulation,
  params,
};
