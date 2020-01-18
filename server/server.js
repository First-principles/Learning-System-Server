const app = require("./intialize");
const mongoose = require("mongoose");
const config = require('../config/config');
var isProduction = process.env.NODE_ENV === 'production';

//NOTE Import DB
require('../models/Lesson');
require('../models/Course');
require('../models/User');
require('../models/Comment');

//NOTE Import API
app.use(require('../routes'));

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