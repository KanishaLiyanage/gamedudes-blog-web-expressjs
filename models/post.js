const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true
    },
    imageURL: String,
    category: String,
    description: String,
    userID: String,
    userName: String,
    dateCreated: String

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;