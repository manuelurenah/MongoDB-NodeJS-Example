const Message = require('../models/Message');
const Comment = require('../models/Comment');

module.exports = {
    showMessages: showMessages,
    addMessages: addMessages,
    saveMessage: saveMessage,
    viewMessage: viewMessage,
    deleteMessage: deleteMessage,
    topMessages: topMessages
};

var sess;

function showMessages(req, res) {
    Message.find({}, (err, messages) => {
        if (err) {
            res.status(404);
            res.send('Messages not found!');
        }

        res.render('pages/messages', {
            messages: messages
        });
    });
}

function addMessages(req, res) {
    res.render('pages/add-message');
}

function saveMessage(req, res) {
    sess = req.session;
    console.log(sess.currentUser.username);
    var newMessage = new Message({
        message: req.body.message,
        createdBy: sess.currentUser.username
    });
    newMessage.save((err) => {
        if (err) {
            throw err;
        }

        res.redirect('/messages');
    });
}

function viewMessage(req, res) {
    Message.findById(req.params.id, (err, message) => {
        if (err) {
            res.status(404);
            res.send('The requested message does not exists!');
        }

        Comment.find({
            message: req.params.id
        }, (err, comments) => {
            if (err) {
                comments = [];
            }

            res.render('pages/single', {
                message: message,
                comments: comments
            });
        });
    });
}

function deleteMessage(req, res) {
    Message.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(404);
            res.send(`Message with id: ${req.params.id} does not exists!`);
        }

        res.redirect('/messages');
    });
}

function topMessages(req, res) {
    Message.find({}, (err, messages) => {
        if (err) {
            throw err;
        }

        const topMessages = messages.sort((a, b) => a.comments.length < b.comments.length).slice(0,5);

        res.render('pages/top-messages', {
            messages: topMessages
        });
    });
}
