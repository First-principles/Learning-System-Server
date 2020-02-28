var mongoose = require('mongoose');
/**
 * @title ===   => Course title
 * @author == ID => Course's Author
 * @description => A brief about the course
 * @images => images to be viewed in the course intro
 * @favoritesCount => people whole like this course
 * @lessons => lessons being contained in the course
 * @comments => Course's comments
 */
var CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    images: [Buffer],
    favoritesCount: { type: Number, default: 0 },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = CourseSchema  = mongoose.model('Course', CourseSchema);