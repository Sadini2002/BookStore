const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./conn/conn');

dotenv.config();
//vLJia54jUJgCWacq
//mongodb+srv://<db_username>:<db_password>@cluster0.zdcdipd.mongodb.net/

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(process.env.PORT
, () => {
    console.log('Server is running on port 3000');
}   );
