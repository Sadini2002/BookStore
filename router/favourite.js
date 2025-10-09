import express from "express"
import User from "../models/user.js";
import authenticateToken from "./userAuth.js";

const router= express.Router();


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
// remove book from favourite
router.delete("/remove-book-from", authenticateToken, async(req, res)=>{
    try{
        const {bookid, id}= req.body;
        const userData = await User.findById(id)
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite){
            return res.status(200).json({message:"Book is already in favourite"})

        }
        await User.findByIdAndUpdate(id,{$push:{favourites: bookid}})
        return res.status(200).json({message:"Book remove to favourite"})
    } catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}
)
// get favourite books
router.get("/getFavouriteBook", authenticateToken, async(req, res)=>{
    try{
        const {id} = req.body;
        const userData = await User.findById(Id).populate("favourite");
        const favouriteBooks = userData.favourites;
        return res.json({
            status:"Success",
            data: favouriteBooks,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"An error occured"
        })

    }
})









export default router;
 