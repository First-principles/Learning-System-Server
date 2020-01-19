var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

const { RouteNames } = require("../../constants/constants");

router.post(RouteNames.AddUser, function(req, res, next) {
    var user = new User();
    const UserInfo = req.body.user;
    try {
        user.username = UserInfo.username;
        user.first_name = UserInfo.first_name;
        user.last_name = UserInfo.last_name;
        user.email = UserInfo.email;
        user.setPassword(UserInfo.password);
    } catch (e) {}

    user.save(function(err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(422).send({ succes: false, message: 'User already exist!' });
            }
            return res.status(422).send(err);
        }
        res.json({
            username: user.username,
            email: user.email,
            token: user.token
        });
    });
})



module.exports = router;