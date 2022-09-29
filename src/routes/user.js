const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const date = require('../utils/date');

const router = new express.Router();

router.get('/signUp', async (req, res) => {

    res.render('signUp');

});

router.get('/signIn', async (req, res) => {

    res.render('signIn');
    
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

router.get('/profile', async (req, res) => {

    if (await req.isAuthenticated()) {

        res.render('profile');

    } else {

        res.redirect('/signIn');

    }

});

module.exports = router;