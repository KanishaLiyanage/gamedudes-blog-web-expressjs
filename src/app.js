const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const userRouter = require('../src/routes/user');
const postRouter = require('../src/routes/post');

const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: "gamedude27017",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('../src/db/connection');
const User = require('../src/models/user');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(userRouter);
app.use(postRouter);

app.get('/about', async (req, res) => {
    res.render('about');
});

app.listen(port, function () {
    console.log("Server up on port " + port + ".");
});