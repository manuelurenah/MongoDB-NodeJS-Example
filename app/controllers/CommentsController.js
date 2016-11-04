const Comment = require('../models/Comment');

module.exports = {
    showComments: showComments,
    addComments: addComments,
    saveComment: saveComment,
    deleteComment: deleteComment,
    seedComments: seedComments
};

var sess;

function showComments(req, res) {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(404);
            res.send('Comments not found!');
        }

        res.render('pages/comments', {
            comments: comments
        });
    });
}

function addComments(req, res) {
    res.render('pages/add-comment');
}

function saveComment(req, res) {
    sess = req.session;
    console.log(sess.currentUser.username);
    var newComment = new Comment({
        message: req.body.message,
        createdBy: sess.currentUser.username
    });
    newComment.save((err) => {
        if (err) {
            throw err;
        }

        res.redirect('/comments');
    });
}

function deleteComment(req, res) {
    Comment.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(404);
            res.send(`Comment with id: ${req.params.id} does not exists!`);
        }

        res.redirect('/comments');
    });
}

function seedComments(req, res) {
    const comments = [{
        message: 'Hello'
    }, {
        message: 'Hola'
    }, {
        message: 'Hallo'
    }, {
        message: 'Bonjour'
    }];

    Comment.remove({}, () => {
        for (var comment of comments) {
            var newComment = new Comment(comment);
            newComment.save();
        }
    });

    res.send('Database seeded!');
}
