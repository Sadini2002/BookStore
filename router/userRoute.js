import express from "express";
const router = express.Router();
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "./userAuth.js";

//sign up
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        //check usrname lenth is more than 4
        if (username.length <= 4) {
            return res.status(400)
            .json({ message: "username must be more than 4 characters" });
        }
        // check username already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400)
            .json({ message: "username already exists" });
        }
        //check email already exists

        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400)
            .json({ message: "email already exists" });
        }
        // check password length is more than 6

        if (password.length < 6) {
             return res.status(400)
            .json({ message: "Password must be more than 6 characters" });
        }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
        // create new user


        const user = new User({
            username,
            email, 
            password:hashedPassword, 
            address
         });
        await user.save();
    
        res.status(200).json({ message: "User registered successfully" });







    }catch(error){
        res.status(500).json({message: "internal server error"});
    }

});


// sign in
router.post('/signin', async (req, res) => {
    try {const { username, password } = req.body;
        // check username already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (!existingUser) {
            return res.status(400)
            .json({ message: "Invalid credentials" });
        }

        //bycrpt
        await bcrypt.compare(password, existingUser.password, (err, data) => {
            
        
        if (data) {
                //generate token
                const authClaims = [
                    { username: existingUser.username}, 
                    {role: existingUser.role}

                 ];
              
                const token = jwt.sign({authClaims}, process.env.JWT_SECRET , {expiresIn: '30d'});
                return res.status(200).json({ 
                    id:existingUser._id, 
                    role: existingUser.role, 
                    token: token });
            } else {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        });
        

            

        
        
    }
       catch(error){
        res.status(500).json({message: "internal server error"});
    }

});

//get user info
router.get('/users/get-info', authenticateToken, async (req, res) => {
    try {  
        const { id } = req.params;
        const data = await User.findById(id)
        return res.status(200).json(data);
        

    }catch(error){
        res.status(500).json({message: "internal server error"});
    }
});

//update user info
router.put('/users/update-info/:id', authenticateToken, async (req, res) => {
    try {  
        const { id } = req.params;
        const { username, email, address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { username, email, address }, { new: true });
        return res.status(200).json(updatedUser);
        

    }catch(error){  
    
        res.status(500).json({message: "internal server error"});
    }
});










export default router;