import mongoose from "mongoose";

//iWyudFI9VsIKRuwQ
//jasingha2002sadininipunika_db_user

const conn = async () => {
    try {
         mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("MongoDB Connected:");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        
    }   
};

export default conn;