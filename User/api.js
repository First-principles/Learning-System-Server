var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
const Controlers = require("./methods");
const parameters = require("./populations");
const Routes = require("./constants");
const helper = require("../helper/helper");
const params = parameters.params;
// router.param(params.user,userPopulation);

//SECTION add user
router.post(Routes.AddUser, Controlers.register);

//SECTION user login
router.post(Routes.Login, Controlers.login);

//SECTION update user
router.put(Routes.update, helper.required, Controlers.update);

//SECTION follow user
router.post(Routes.follow, helper.required, Controlers.followUser);

module.exports = router;
