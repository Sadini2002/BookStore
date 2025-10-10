import authenticateToken from "./userAuth";
import Book from "../models/bookModel";
import router from "./userRoute";
import order from "../models/order";
import User from "../models/user";


//get order history
router.post("/place-order", authenticateToken, async (requestAnimationFrame, res)=>{
try {
    const {id}= req.header;
    const {order} = req.body;
    
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
    
    
    
   return res.status(200)
    .json({message:"Order placed successfully"})
    }catch(error){
        res.status(500).json({ message: "Internal server error"});
        console.log(error);
        }
        

}

)
// get all history
 router.get("/get-order-history", authenticateToken, async (req,res)=>{
    try{
        const {id}= req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"}
            })
            const orders = userData.orders.reverse();
            return res.json({
                status:"Success",
                data: orderData
            })
            
            
            

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"An error occured"})

    }


 })

 //update order admin
 router.put("/updateStatus/:id", authenticateToken, async(req, res)=>{
    try{
        const {id} = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status})
        return res.status(200).json({message:"Status updates successfully"})

    }catch(error){
        console.log("error")
        return res.status(500).json({message:"an eorror occured"})

    }

 })

 router.get("/getAllOrders",authenticateToken, async(req, res)=>{
    try{
        const orderData = await Order.find().populate({
            path:"book",
            path:"user"
        })
        return res.json({
            status: "Success",
            data: orderData
        })

        }catch(error){
        console.log(error)
            return res.status(500).json({message:"an eorror occured"})
        }
        


 })








export default orderRoutr