import express from "express";
import dotenv from "dotenv";
import conn from "./conn/conn.js"; 
import router from "./router/userRoute.js";
import bookRouter from "./router/bookRoute.js";
import User from "./models/user.js";
import favourite  from "./router/favourite.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use("/api/users", User);
app.use("/api/book", bookRouter);
app.use("/api/favourite", favourite);



conn();



app.listen(process.env.PORT
, () => {
    console.log('Server is running on port 3000');
}   );


