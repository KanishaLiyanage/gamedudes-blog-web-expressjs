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

router.get('/user/userID=:userID',

    async (req, res) => {

        let id = await req.params.userID;

        User.findById(id, async (err, foundUser) => {
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    let user = await foundUser;
                    Post.find({ userID: id }, async (err, foundBlogs) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (foundBlogs) {
                                let blogs = await foundBlogs;
                                res.render('user',
                                    { userName: user.username, blogs: blogs }
                                );
                            }
                        }
                    });
                }
            }
        });

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

router.get('/posts/edit-post/postID=:postID',

    async (req, res) => {

        let id = await req.params.postID;

        if (await req.isAuthenticated()) {

            Post.findById(id, async (err, foundBlog) => {
                if (err) {
                    console.log(err);
                } else {
                    if (foundBlog) {
                        let blog = await foundBlog;
                        res.render('edit-blog',
                            {
                                blogId: blog._id,
                                blogTitle: blog.title,
                                blogImg: blog.imageURL,
                                blogCat: blog.category,
                                blogDesc: blog.description
                            }
                        );
                    }
                }
            });

        } else {

            res.redirect('/signIn');

        }

    });

router.post('/posts/edit-post/blogId=:blogId',

    async (req, res) => {

        let id = await req.params.blogId;

        if (await req.isAuthenticated()) {

            await Post.findByIdAndUpdate(
                id,
                req.body,
                { new: true, runValdators: true }
            );

            res.redirect('/profile');

        } else {

            res.redirect('/signIn');

        }

    });

router.get('/posts/delete-post/postID=:postID',

    async (req, res) => {

        let id = await req.params.postID;

        if (await req.isAuthenticated()) {

            Post.deleteOne(
                { _id: id },
                function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/profile');
                    }
                }
            );

        } else {

            res.redirect('/signIn');

        }

    });

router.post('/posts/search', async (req, res) => {

    category = req.body.catName;
    
    Post.find(
        { category: category }, function (err, foundBlogs) {
            if (err) {
            } else {
                if (foundBlogs) {
                    let blogs = foundBlogs;
                    let length = blogs.length;
                    res.render('search', { postsList: blogs, postCount: length });
                }
            }
        }
    );

});

module.exports = router;