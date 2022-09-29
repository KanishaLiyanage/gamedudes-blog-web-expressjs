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



    res.redirect('/');

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

    res.render('profile');

});

module.exports = router;