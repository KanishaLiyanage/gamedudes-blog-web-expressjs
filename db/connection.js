require('dotenv').config();

const mongoose = require('mongoose');

const localDB = "mongodb://127.0.0.1:27017/GameDudeDB";
const atlasURL = process.env.ATLAS_URL;

const dbURL = localDB || atlasURL;

mongoose.connect(dbURL);

// mongoose.connect(atlasURL);