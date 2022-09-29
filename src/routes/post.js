const express = require('express');

const Post = require('../models/post');
const User = require('../models/user');
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

    if (await req.isAuthenticated()) {

        User.findById(req.user.id, async (err, foundUser) => {

            if (err) {
                console.log(err);
            } else {
                if (foundUser) {

                    const post = new Post({

                        title: req.body.title,
                        imageURL: req.body.url,
                        category: req.body.category,
                        description: req.body.description,
                        userID: foundUser._id,
                        userName: foundUser.username,
                        dateCreated: date.getDate()

                    });

                    await post.save();
                    res.redirect('/');

                }
            }

        });

    } else {

        res.redirect('/signIn');

    }

});

router.get('/posts/postID=:postID',

    async (req, res) => {

        let id = await req.params.postID;

        Post.findById(id, async (err, foundBlog) => {
            if (err) {
                console.log(err);
            } else {
                if (foundBlog) {
                    let blogs = await foundBlog;
                    res.render('blog',
                        { blog: blogs }
                    );
                }
            }
        });

    });

module.exports = router;