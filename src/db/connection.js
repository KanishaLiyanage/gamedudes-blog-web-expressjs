const mongoose = require('mongoose');

const localDB = "mongodb://127.0.0.1:27017/GameDudeDB";

mongoose.connect(localDB);