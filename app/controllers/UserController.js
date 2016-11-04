const User = require('../models/User');

module.exports = {
    createUser: createUser,
    processCreate: processCreate,
    loginUser: loginUser,
    processLogin: processLogin,
    logoutUser: logoutUser
};

var sess;

function createUser(req, res) {
    res.render('pages/register');
}

function processCreate(req, res) {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save((err) => {
        if (err) {
            throw err;
        }
        res.redirect('/user/login');
    });
}

function loginUser(req, res) {
    res.render('pages/login');
}

function processLogin(req, res) {
    sess = req.session;
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }, (err, user) => {
        if (err) {
            res.status(404);
            res.send('User not found!');
        }

        if (user === null) {
            res.redirect('/user/login');
        } else {
            sess.currentUser = user;
            res.redirect('/');
        }
    });
}

function logoutUser(req, res) {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    });
}
