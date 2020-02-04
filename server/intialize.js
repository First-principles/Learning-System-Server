const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");

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

module.exports = app;