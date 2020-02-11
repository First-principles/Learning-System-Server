var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    images: Buffer,
    favoritesCount: { type: Number, default: 0 },
    body:{type:String, required:true},
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    article:{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    course:{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' },    
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


mongoose.model('Comment', CommentSchema);