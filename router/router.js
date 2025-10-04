const router = require("express").Router();
const User = require('../models/user');

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
        const existingUser = await User.find({ username: username });
        if (existingUser) {
            return res.status(400)
            .json({ message: "username already exists" });
        }
        //check email already exists

        const existingEmail = await User.find({ email: email });
        if (existingEmail) {
            return res.status(400)
            .json({ message: "email already exists" });
        }
        // check password length is more than 6

        if (password.length < 6) {
             return res.status(400)
            .json({ message: "Password must be more than 6 characters" });
        }


        const user = new User({
            username:username,
            email:email, 
            password:password, 
            address:address
         });
        await user.save();
    
        res.status(201).json({ message: "User registered successfully" });







    }catch(error){
        res.status(500).json({message: "internal server error"});
    }

});



module.exports = router;