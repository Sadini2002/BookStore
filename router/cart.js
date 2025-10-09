const router = express.Router();
import User from "../models/user";
import authenticateToken from "./userAuth";


// put book to cart
router.put("/addToCart",authenticateToken , async (req, res)=>{
    try{
        const { bookid, id} = req.body;
        const userData = await User.findById(id);
        const isBookCart= userData.cart.includes(bookid);
         isBookFavourited(isBookCart){
            return res.json({
                status:"Success",
                message:"Book is already cart"

            })
        }
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}})
        return res.json({ status:"success",
            message:"Book added to cart"}

        )

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"An error occured"
        })


    }
})






module.exports = router;