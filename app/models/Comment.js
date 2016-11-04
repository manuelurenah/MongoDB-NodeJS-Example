const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const commentSchema = new Schema({
    description: String,
    user: String,
    message: { type: Schema.Types.ObjectId, ref: 'message' }
});

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;
