const express = require('express');

const Post = require('../models/post');
const date = require('../utils/date');

const router = express.Router();

router.get('/', async (req, res) => {

    let posts = await Post.find();

    res.render('home', { postsList: posts });

});

router.get('/compose', async (req, res) => {

    if (await req.isAuthenticated()) {

        res.render('compose');

    } else {

        res.redirect('/signIn');

    }

});

router.post('/compose', async (req, res) => {

    const post = new Post({

        title: req.body.title,
        imageURL: req.body.url,
        category: req.body.category,
        description: req.body.description,
        dateCreated: date.getDate()

    });

    await post.save();

    res.redirect('/');

});

router.get('/posts/postID=:postID',

    async (req, res) => {

        let id = req.params.postID;

        Post.findById(id, async (err, foundPost) => {
            if (err) {
                console.log(err);
            } else {
                if (foundPost) {
                    let posts = foundPost;
                    res.render('blog',
                        { posts: posts }
                    );
                }
            }
        });

    });

module.exports = router;