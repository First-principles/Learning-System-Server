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
module.exports = app;