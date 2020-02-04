var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    images: Buffer,
    favoritesCount: { type: Number, default: 0 },
    body:String,
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


mongoose.model('Comment', CommentSchema);