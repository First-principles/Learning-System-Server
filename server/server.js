const app = require("./intialize");
const mongoose = require("mongoose");
const config = require('../config/config');
var isProduction = process.env.NODE_ENV === 'production';
var userComponent = require("../User/index");

//NOTE Import API
app.use(require('../routes'));
app.use(userComponent);

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