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


router.put("/removeFromCart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.body; // bookid = book _id, id = user _id

    // Check if user exists
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    // Check if book is actually in cart
    const isBookInCart = userData.cart.includes(bookid);
    if (!isBookInCart) {
      return res.json({
        status: "Failed",
        message: "Book is not in cart",
      });
    }

    // Remove the book from cart array
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });

    return res.json({
      status: "Success",
      message: "Book removed from cart",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while removing book from cart",
    });
  }
});

// Get cart items for a user
router.get("/getCartItems", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers; // user _id from headers

    // Check if user exists
    const userData = await User.findById(id).populate("cart");
    if (!userData) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    // Return cart items
    return res.json({
      status: "Success",
      data: userData.cart,
    });     
  } catch (error) { 
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching cart items",
    });
  }
});








module.exports = router;