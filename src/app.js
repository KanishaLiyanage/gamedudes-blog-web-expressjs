const express = require('express');

const app = express();
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.render('home');
});


app.listen(port, function(){
    console.log("Server up on port " + port + ".");
});