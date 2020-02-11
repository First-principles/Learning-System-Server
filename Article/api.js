var router = require('express').Router();
const {addarticle , removearticle} = require('./methods');
const helper = require("../helper/helper");
const  Route = require("./constants");

//SECTION Add an article 
router.post(Route.AddArticle, helper.required, addarticle);

//SECTION Remove an article 
router.delete(Route.AddArticle, helper.required, removearticle);

module.exports = router;