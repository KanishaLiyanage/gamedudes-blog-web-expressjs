const express = require('express');
const bodyParser = require('body-parser');

require('../src/db/connection');
const userRouter = require('../src/routes/user');
const postRouter = require('../src/routes/post');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.use(userRouter);
app.use(postRouter);

app.get('/about', async (req, res) => {
    res.render('about');
});

app.listen(port, function () {
    console.log("Server up on port " + port + ".");
});