var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    images: Buffer,
    favoritesCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


mongoose.model('Course', CourseSchema);