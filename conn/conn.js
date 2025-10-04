const mongoose = require('mongoose');

//iWyudFI9VsIKRuwQ
//jasingha2002sadininipunika_db_user

const connectDB = async () => {
    try {
         mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }   
};

module.exports = connectDB;