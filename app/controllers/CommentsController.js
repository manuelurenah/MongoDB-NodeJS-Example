const Comment = require('../models/Comment');

module.exports = {
    addComment: addComment
};

var sess;

function addComment(req, res) {
    sess = req.session;
    var newComment = new Comment({
        description: req.body.description,
        user: sess.currentUser.username,
        messageId: req.body.messageId
    });
    
    newComment.save((err) => {
        if (err) {
            throw err;
        }

        res.redirect(`/messages/${req.body.messageId}`);
    });
}
