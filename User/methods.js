var mongoose = require('mongoose');
var User = mongoose.model('User');

const adduser = (req, res, next) => {
    var user = new User();
    const UserInfo = req.body.user;
    console.log(req.body);
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
            user:{
            username: user.username,
            email: user.email,
            token: user.token}
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
        const updateData = req.body.user;
        if (!updateData){
            res.status(422).send({"message":"please provide what you want to update"})
        }
        User.findById(req.body.user._id).then(function(user) {
            if (!user) { return res.sendStatus(401); }

            //NOTE  only update fields that were actually passed...
            if (typeof updateData.username !== 'undefined') {
                user.username = updateData.username;
            }
            if (typeof updateData.email !== 'undefined') {
                user.email = updateData.email;
            }
            if (typeof updateData.first_name !== 'undefined') {
                user.first_name = updateData.first_name;
            }
            if (typeof updateData.last_name !== 'undefined') {
                user.last_name = updateData.last_name;
            }
            if (typeof updateData.bio !== 'undefined') {
                user.bio = updateData.bio;
            }
            if (typeof updateData.avatar !== 'undefined') {
                user.avatar = updateData.avatar;
            }
            if (typeof updateData.password !== 'undefined') {
                user.setPassword(updateData.password);
            }
            return user.save()
                .then(function() {
                    return res.json({ user: user.toAuthJSON() });
                });
        }).catch(()=>{
            res.status(422).send({"message":"couldn't update user"})
        }
        );
    };

module.exports = { adduser, login  , updateUser};