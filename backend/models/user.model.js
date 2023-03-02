const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: { type: String, required: [true, "Please enter Username"], unique: [true, "Username exists"] },
    password: {type: String, required: [true, "Enter your Password"], unique: false}

});

const User = mongoose.model('User', userSchema);

module.exports = User;