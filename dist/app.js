"use strict";
//external module
const express = require('express');
const mongoose = require('mongoose');
//internal module
const routes = require('./userHandler/userHandler');
//express init
require('dotenv').config();
const app = express();
//connecting database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
//handle routes
app.use('/user', routes);
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}..`);
});
