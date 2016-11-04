const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const commentSchema = new Schema({
    message: String,
    datePublished: Date,
    createdBy: String
});

commentSchema.pre('save', function(next) {
    this.datePublished = new Date();
    next();
});

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;
