const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: String,
    datePublished: Date,
    createdBy: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

messageSchema.pre('save', function(next) {
    this.datePublished = new Date();
    next();
});

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
