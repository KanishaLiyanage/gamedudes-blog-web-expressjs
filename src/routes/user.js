const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const Post = require('../models/post');
const date = require('../utils/date');

const router = new express.Router();

router.get('/signUp', async (req, res) => {

    res.render('signUp');

});

router.get('/signIn', async (req, res) => {

    res.render('signIn');

});

router.post('/register', async (req, res) => {

    User.register(

        { username: req.body.username, accCreatedDate: date.getDate() },
        req.body.password,
        function (err, user) {
            if (err) {
                console.log(err);
                res.redirect('/signUp');
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect('/compose');
                });
            }
        }

    );

});

router.post('/login', async (req, res) => {

    const user = new User({

        username: req.body.username,
        password: req.body.password

    });

    req.login(user, function (err) {

        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect('/');
            });
        }

    });

});

router.get('/logout', async (req, res) => {

    req.logout(function (err) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });

});

router.get('/profile', async (req, res) => {

    if (await req.isAuthenticated()) {

        User.findById(req.user.id, async (err, foundUser) => {

            if (err) {
                console.log(err);
            } else {
                if (foundUser) {

                    Post.find({ userID: foundUser._id }, async (err, foundBlogs) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (foundBlogs) {
                                let blogs = await foundBlogs;
                                res.render('profile', { userName: foundUser.username, blogs: blogs });
                            }
                        }
                    });

                }
            }

        });

    } else {

        res.redirect('/signIn');

    }

});

module.exports = router;