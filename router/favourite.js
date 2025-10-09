const router = require("express").Router();
import User from "../models/user.";
import authenticateToken from "./userAuth";


//add book to favourite
router.put("/add-book-to-favourite", authenticateToken, async (req, res)=>{
try{
    const {bookid, id}= req.body;
    const userDate = await User.findById(id);
    const isBookFavourite= userData.favourite.includes(bookid)
    if (isBookFavourite){
        return res.status(200).json({message:"Book is already in favourite"})
    }
    await User.findByIdAndUpdate(id, {$push:{favourite : bookid}}) 
    return res.status(200).json({message:"Book added to favourites"})
        

}catch(error){
    res.status(500).json({message: "Internal server error"});
}


})

router.delete("/remove-book-from", authenticateToken, async(req, res)=>{
    try{
        const {bookid, id}= req.body;
        const userData = await User.findById(id)
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite){
            return res.status(200).json({message:"Book is already in favourite"})

        }
        await User.findByIdAndUpdate(id,{$push:{favourites: bookid}})
        return res.status(200).json({message:"Book added to favourite"})
    } catch(error){
        req,status(500).json({message:"Internal server error"})
    }
}
)









module.exports= router;
 