const express = require('express');

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

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        accCreatedDate: date.getDate()
    });

    await user.save();

    res.redirect('/');

});

router.get('/profile', async (req, res) => {
    res.render('profile');
});

module.exports = router;