var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    images: Buffer,
    favoritesCount: { type: Number, default: 0 },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


mongoose.model('Course', CourseSchema);