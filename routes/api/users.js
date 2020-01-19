var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require("passport");

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
        user.token = user.generateJWT();
    } catch (e) {}

    user.save(function(err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(422).send({ succes: false, message: 'User already exist!' });
            }
            return res.status(422).send(err);
        }
        res.status(202).json({
            username: user.username,
            email: user.email,
            token: user.token
        });
    });
});

//SECTION login 
router.post(RouteNames.Login, async function(req, res, next) {
    const UserInfo = req.body.user;
    if (!UserInfo.email) {
        res.send(422).json({ error: { message: "please provide email " } });
    };
    if (!UserInfo.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    };
    var user = await User.findOne({ email: UserInfo.email }).then(
        user => {
            console.log(user);
            if (user.validPassword(UserInfo.password)) {
                return res.status(202).json(
                    user.toAuthJSON()
                )
            } else {
                return res.status(422).send({ errors: { authentication: "authentication error" } })
            }
        }
    ).catch(next);
});




module.exports = router;