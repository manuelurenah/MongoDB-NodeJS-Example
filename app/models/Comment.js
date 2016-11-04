const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const commentSchema = new Schema({
    description: String,
    user: String,
    messageId: String
});

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;
