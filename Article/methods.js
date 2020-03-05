var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');

const addarticle = (req, res, next) => {
    const ArticleInfo = req.body.article;
    const UserInfo = req.body.user;
    if (!ArticleInfo) {
        return res.status(422).send({ errors: { message: "Article not found" } });
    };
    if (!UserInfo) {
        return res.status(422).send({ errors: { message: "User not found" } });
    };
    User.findById(UserInfo._id).then((user)=>{
            if (!user) {
                res.status(422).send({ errors: { message: "User not found" } });
            };
            const article = new Article(ArticleInfo);
            user.articles.push(article);
            user.save();
            article.save().then(() => {
                
                res.status(202).send({ 
                    //TODO toArticleJSON
                    article });
            }).catch(next);
        })
};

const removearticle = (req, res, next) => {
    const ArticleInfo = req.body.article;
    const UserInfo = req.body.user;
    if (!ArticleInfo) {
        return res.status(422).send({ errors: { message: "Article not found" } });
    };
    if (!UserInfo) {
        return res.status(422).send({ errors: { message: "User not found" } });
    };

    User.findById(UserInfo._id).then((user)=>{
            if (!user) {
                res.status(422).send({ errors: { message: "User not found" } });
            };

            Article.deleteOne({_id:ArticleInfo._id}).then(
                (article) => {
                    if (!article){return res.status(422).send({ errors: { message: "Article not found" } })};
                    user.articles.splice(user.comments.indexOf(article._id),1);
                    user.save().then(
                        res.status(202).send({
                            user:UserInfo
                        })
                    ).catch(next);
                }
            )
        });
};

module.exports = {addarticle,removearticle};