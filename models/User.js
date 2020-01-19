var mongoose = require('mongoose');
const config = require('../config/config');

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
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    },
    last_name: {
        type: String,
        required: [true, "can't be blank"],
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
    contacts: [],
    bio: String,
    avtar: String,
    favorite_Lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    favorite_Courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    favorite_Comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    hash: String,
    salt: String,
}, { timestamps: true });

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};





mongoose.model('User', UserSchema);