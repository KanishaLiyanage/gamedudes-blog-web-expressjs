const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    accCreatedDate: String

});

const User = mongoose.model('User', userSchema);

module.exports = User;