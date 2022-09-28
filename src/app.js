const express = require('express');
const bodyParser = require('body-parser');

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

app.get('/postID', async (req, res) => {
    res.render('post');
});

app.listen(port, function () {
    console.log("Server up on port " + port + ".");
});