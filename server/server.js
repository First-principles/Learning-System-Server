const app = require("./intialize");
const mongoose = require("mongoose");
const config = require('../config/config');
var isProduction = process.env.NODE_ENV === 'production';

//SECTION Importing components
var userComponent = require("../User/index");
var courseComponent = require("../Course/index");
var lessonComponent = require("../Lesson/index");
var commentComponent = require("../Comment/index");
//NOTE Import API
app.use(userComponent);
app.use(courseComponent);
app.use(lessonComponent);
app.use(commentComponent);

if (isProduction) {
    mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
} else {
    mongoose.connect(config.LocalDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
    mongoose.set('debug', true);
}
module.exports = app;