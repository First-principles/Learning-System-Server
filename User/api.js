var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
const Controlers = require("./methods");
const parameters = require("./populations");
const Routes = require("./constants");
const helper = require("../helper/helper");
const params = parameters.params;

//SECTION routes params
router.param(params.user,parameters.userPopulation);
router.param(params.course,parameters.coursePopulation);
router.param(params.lesson,parameters.lessonPopulation);
router.param(params.article,parameters.articlePopulation);
router.param(params.comment,parameters.commentPopulation);

//SECTION add user
router.post(Routes.AddUser, Controlers.register);

//SECTION user login
router.post(Routes.Login, Controlers.login);

//SECTION update user
router.put(Routes.update, helper.required, Controlers.update);

//SECTION follow user
router.post(Routes.follow, helper.required, Controlers.followUser);

module.exports = router;
