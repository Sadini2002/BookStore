const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
//vLJia54jUJgCWacq
//mongodb+srv://<db_username>:<db_password>@cluster0.zdcdipd.mongodb.net/


app.listen(process.env.PORT
, () => {
    console.log('Server is running on port 3000');
}   );
