const app = require("./intialize");
const mongoose = require("mongoose");
const LocalDB = require('../config/config').LocalDB;
var isProduction = process.env.NODE_ENV === 'production';

//SECTION Import schemas
const User = require('../User/schema');
const Article = require('../Article/schema');
const Comment = require("../Comment/schema");
const Lesson = require("../Lesson/schema");
const Course = require("../Course/schema");

//SECTION ADMINBRO
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
AdminBro.registerAdapter(AdminBroMongoose)

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

var DB = null;
//SECTION Connecting to MongoDB
if (isProduction) {
    mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
} else {
    DB = mongoose.connect(LocalDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
    mongoose.set('debug', true);
}
const contentParent = {
  name: 'Content',
}

const adminBro = new AdminBro({
    resources: [
        {resource: User},
        {resource:Lesson},
        {resource:Course},
        {resource:Comment},
        {resource:Article}

        ],
      database:DB,
      branding: {
        companyName: 'Learn-Web-Community',
      },
          rootPath: '/admin',
  })
const router = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)


//NOTE exporting app to avoid singleton violation
module.exports = app;