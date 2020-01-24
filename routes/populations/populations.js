const Course = function(req, res, next, slug) {
    Course.findOne({ slug: slug })
        .populate('author')
        .then(function(course) {
            //NOTE in case article not found
            if (!course) {
                return res.sendStatus(404);
            }
            req.course = course;
            return next(); //MiddleWare
        }).catch(next);
};

const comment = (req, res, next, id) => {
    Comment.findById(id).then(function(comment) {
        if (!comment) {
            return res.sendStatus(404);
        }
        req.comment = comment;
        return next();
    }).catch(ncommentext);
};

module.exports = { article, comment };