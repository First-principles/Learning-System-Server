var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require("passport");


const adduser = (req, res, next) => {
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
};

const login = async(req, res, next) => {
    const UserInfo = req.body.user;
    if (!UserInfo.email) {
        res.send(422).json({ error: { message: "please provide email " } });
    };
    if (!UserInfo.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    };
    var user = await User.findOne({ email: UserInfo.email }).then(
        user => {
            if (user.validPassword(UserInfo.password)) {
                return res.status(202).json(
                    user.toAuthJSON()
                )
            } else {
                return res.status(422).send({ errors: { authentication: "authentication error" } })
            }
        }
    ).catch(
        () => {
            return res.status(422)
                .send({ errors: { authentication: "Email not valid" } })
        }
    );
};

const updateUser = (req ,res, next)=>{
        User.findById(req.payload.id).then(function(user) {
    
            if (!user) { return res.sendStatus(401); }
    
            //NOTE  only update fields that were actually passed...
            if (typeof req.body.user.username !== 'undefined') {
                user.username = req.body.user.username;
            }
            if (typeof req.body.user.email !== 'undefined') {
                user.email = req.body.user.email;
            }
            if (typeof req.body.user.first_name !== 'undefined') {
                user.email = req.body.user.email;
            }
            if (typeof req.body.user.last_name !== 'undefined') {
                user.email = req.body.user.email;
            }
            if (typeof req.body.user.bio !== 'undefined') {
                user.bio = req.body.user.bio;
            }
            if (typeof req.body.user.image !== 'undefined') {
                user.image = req.body.user.image;
            }
            if (typeof req.body.user.password !== 'undefined') {
                user.setPassword(req.body.user.password);
            }
    
            return user.save().then(function() {
                return res.json({ user: user.toAuthJSON() });
            });
        }).catch(()=>{
            res.status(402).send({"message":"couldn't update user"})
        }
        );
    };

module.exports = { adduser, login  , updateUser};