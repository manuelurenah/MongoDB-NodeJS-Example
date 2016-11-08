const Comment = require('../models/Comment');
const Message = require('../models/Message');

module.exports = {
    addComment: addComment,
    topWords: topWords
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

function topWords(req, res) {
    var o = {};
    o.map = function() {
        var desc = this.description.toLowerCase().split(" ");
        for (var i = desc.length - 1; i >= 0; i--) {
            if (desc[i]) {
                var key = {
                    word: desc[i]
                };
                emit(key, 1);
            }
        }
    };

    o.reduce = function(key, values) {
        var count = 0;
        values.forEach((v) => {
            count += v;
        });
        return count;
    };

    Comment.mapReduce(o, (err, results) => {
        if (err) {
            throw err;
        }

        const topWords = results.sort((a,b) => a.value < b.value);

        res.render('pages/top-words', {
            words: topWords
        });
    });
}
