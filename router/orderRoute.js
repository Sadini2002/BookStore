import authenticateToken from "./userAuth";
import Book from "../models/bookModel";
import router from "./userRoute";
import order from "../models/order";


router.post("/place-order", authenticateToken, async (requestAnimationFrame, res)=>{
try {
    const {order}= req.body;
    for (constorderData of order)
{    
    const newOrder = new Order({user:Id ,book:orderData.id_id});
    const orderDataFromDb = await newOrder.save();
    // saving order in user model
    await User.findByIdAndUpdate(id,{$push:{orders:orderDataFromDb._id}})
    await User.findByIdAndUpdate(id,{
        $pull:{cart:orderData_id}
    })
}
    
    
    
    res.status(200)
    .json({message:"Order placed successfully"})
    }catch(error){
        res.status(500).json({ message: "Internal server error"});
        console.log(error);
        }
        

}

)



export default orderRoutr