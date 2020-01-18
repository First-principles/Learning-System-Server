const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//NOTE Import DB
require('../models/Lesson');

module.exports = app;