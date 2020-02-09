var router = require('express').Router();
const addarticle = require('./methods');
const helper = require("../helper/helper");
const  Route = require("./constants");


router.post(Route.AddArticle, helper.required, addarticle);

module.exports = router;