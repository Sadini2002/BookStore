import express from "express";
import dotenv from "dotenv";
import conn from "./conn/conn.js"; 
import router from "./router/router.js";
dotenv.config();


//vLJia54jUJgCWacq
//mongodb+srv://<db_username>:<db_password>@cluster0.zdcdipd.mongodb.net/
const app = express();
app.use(express.json());
app.use("/api/users", router);
conn();



app.listen(process.env.PORT
, () => {
    console.log('Server is running on port 3000');
}   );


