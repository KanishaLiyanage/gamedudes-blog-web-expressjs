const express = require('express');

const app = express();
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.render('landing');
});

app.get('/signUp', async (req, res) => {
    res.render('signUp');
});

app.get('/signIn', async (req, res) => {
    res.render('signIn');
});

app.get('/home', async (req, res) => {
    res.render('home');
});

app.get('/profile', async (req, res) => {
    res.render('profile');
});

app.get('/compose', async (req, res) => {
    res.render('compose');
});

app.listen(port, function () {
    console.log("Server up on port " + port + ".");
});