const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title: String,
    imageURL: String,
    category: String,
    description: String,
    dateCreated: String

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;