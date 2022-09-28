const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title: String,
    category: String,
    description: String,
    dateCreated: String

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;