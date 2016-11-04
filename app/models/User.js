const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
