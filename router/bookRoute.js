import router from "./userRoute.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import authenticateToken from "./userAuth.js";
import express from "express";
import book from "../models/bookModel.js";


//add book
router.post("/addbook", authenticateToken, async (req, res)=>{
try{
    const {id}= req.headers;
    await User.findById(id);
    if (User.role !== "admin"){
        return res.status(400).json({message:"You are not authorized to add book"})
        console.log("You are not authorized to add book")
        
    }
    
    const book = new book ({
        url:req.body.url,
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        desc:req.body.desc,
        language:req.body.language
    })
    await book.save();
    res.status(200).json({message:"Book added successfully"})
    console.log("Book added successfully")
    

}catch(err){
    res.status(500).json({message:"Internal server error"})

}



})


module.exports = router;



