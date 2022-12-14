require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const secretKey = process.env.KEY;

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./db/connection');
const User = require('./models/user');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(userRouter);
app.use(postRouter);

app.get('/about', async (req, res) => {

    res.render('about');

});

app.listen(port, function () {
    console.log("Server is up on port " + port + ".");
});