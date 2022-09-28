const express = require('express');
const bodyParser = require('body-parser');

const Post = require('../src/models/post');
require('../src/db/connection');
const date = require('../src/utils/date');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.render('home');
});

app.get('/signUp', async (req, res) => {
    res.render('signUp');
});

app.get('/signIn', async (req, res) => {
    res.render('signIn');
});

app.get('/profile', async (req, res) => {
    res.render('profile');
});

app.get('/compose', async (req, res) => {
    res.render('compose');
});

app.post('/compose', async (req, res) => {

    const post = new Post({

        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        dateCreated: date.getDate()

    });

    await post.save();

    res.redirect('/');

});

app.get('/postID', async (req, res) => {
    res.render('post');
});

app.listen(port, function () {
    console.log("Server up on port " + port + ".");
});