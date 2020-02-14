const app = require("./intialize");
const mongoose = require("mongoose");
const LocalDB = require('../config/config').LocalDB;
var isProduction = process.env.NODE_ENV === 'production';

//SECTION Importing components
var userComponent = require("../User/index");
var courseComponent = require("../Course/index");
var lessonComponent = require("../Lesson/index");
var commentComponent = require("../Comment/index");
var articleComponent = require("../Article/index");

//SECTION Using API Components
app.use(userComponent);
app.use(courseComponent);
app.use(lessonComponent);
app.use(commentComponent);
app.use(articleComponent);

//SECTION Connecting to MongoDB
if (isProduction) {
    mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
} else {
    mongoose.connect(LocalDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
    mongoose.set('debug', true);
}

//NOTE exporting app to avoid singleton violation
module.exports = app;