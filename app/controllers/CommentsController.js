const Comment = require('../models/Comment');
const Message = require('../models/Message');

module.exports = {
    addComment: addComment
};

var sess;

function addComment(req, res) {
    sess = req.session;
    var newComment = new Comment({
        description: req.body.description,
        user: sess.currentUser.username,
        message: req.body.message
    });

    newComment.save((err) => {
        if (err) {
            throw err;
        }

        Message.findById(req.body.message, (err, message) => {
            message.comments.push(newComment);
            message.save();
        });

        res.redirect(`/messages/${req.body.message}`);
    });
}
