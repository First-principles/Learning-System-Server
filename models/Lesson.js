var mongoose = require('mongoose');

/**
 * @slug => a short name given to an article that is in production.
 * @title => title of the article
 * @description =>short brief of the article
 * @body => body of the article
 * @favoritesCount => number of people who favors the article
 * @comments => comments on the article
 * @tagList => tags for the article
 * @author => author of the article
 */
var LessonSchema = new mongoose.Schema({
    title: String,
    description: String,
    body: String,
    images: [Buffer],
    favoritesCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


mongoose.model('Lesson', LessonSchema);