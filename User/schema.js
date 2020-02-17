var mongoose = require('mongoose');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * @courses => The courses made by user
 * @comments => The comments made by user
 * 
 */
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
    },
    first_name: {
        type: String,
        // required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    },
    last_name: {
        type: String,
        // required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user']
    },
    react: {
        type: [{
            type: String,
            enum: ['like', 'dislike']
        }],
        default: ['like']
    },
    contacts: [],
    bio: String,
    avatar: String,
    favorite_Lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    favorite_Courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    favorite_Comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    Recieved_favorite_Lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    Recieved_favorite_Courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    Recieved_favorite_Comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    courses:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    lessons:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    comments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followedBy:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    articles:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    hash: String,
    salt: String,
    interests:[{required:false}]
}, { timestamps: true });

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, config.secret);
};

UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        avatar: this.image,
        _id:this._id,
        courses:this.courses,
        comments:this.comments,
        lessons:this.lessons,
        favorite_Lessons:this.favorite_Lessons,
        favorite_Comments:this.favorite_Comments,
        favorite_Courses:this.favorite_Courses,
        Recieved_favorite_Comments:this.Recieved_favorite_Comments,
        Recieved_favorite_Courses:this.Recieved_favorite_Courses,
        Recieved_favorite_Lessons:this.Recieved_favorite_Lessons,
        interests:this.interests
    };
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

mongoose.model('User', UserSchema);