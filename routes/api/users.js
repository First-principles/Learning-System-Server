var router = require('express').Router();
var mongoose = require('mongoose');
var Lesson = mongoose.model('User');

const { RouteNames } = require("../../constants/constants");

router.post(RouteNames.AddUser, function(req, res, next) {
    var user;
    try {
        user = new user(req.body.user);
    } catch (e) {
        res.status(400).send({ error: { message: "couldn't save User" } });
    }

    user.save().then(function() {
        //user = user.toAuthJSON();
        return res.json({
            email: user.email,
            username: user.username
        });
    }).catch(next);

});



module.exports = router;