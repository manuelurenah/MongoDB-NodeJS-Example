const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: String,
    datePublished: Date,
    createdBy: String
});

messageSchema.pre('save', function(next) {
    this.datePublished = new Date();
    next();
});

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
