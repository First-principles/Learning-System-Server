const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");

/**NOTE We are passing app to the server because
 * When you call the “require” function in Node, it uses 
 * the path of the required file as a cache key. If you require 
 * the same file from multiple other files, you typically
 * get the same cached copy of the module sent back to you.
 */
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'WebCommunity',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
//NOTE Import DB Schemas
require('../Comment/schema');
require('../Lesson/schema');
require('../Course/schema');
require('../User/schema');
require('../Article/schema');

module.exports = app;