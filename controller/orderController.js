const Order = require("../models/orderModel");
const { isAdmin } = require("../utils");

 //Get all Orders
 const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find({});
        res.json(orders);
    }catch(error){
        res.status(500).send({message: "Boss! There was an error getting the orders. \n Please, retry."});
    }
}

   //Get an Order
const getOrderById = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        res.json(order)
    }catch(error){
        res.status(500).send({message: "Boss! An error occured fetching the requested product. Please, retry."});
    }
}

  //Create new Order
const createOrder = async (req, res) => {
    try{
        const order = new Order({
            // orderItems: [{
            //     productName: req.body.productName,
            //     qty: req.body.qty,
            //     imageUrl: req.body.imageUrl,
            //     price: req.body.price,
            //     productId: req.body.productId,
            // }],
            orderItems: req.body.orderItems,
            shippingInformation: {
                firstName: req.body.shippingInformation.firstName,
                lastName: req.body.shippingInformation.lastName,
                address: req.body.shippingInformation.address,
                city: req.body.shippingInformation.city,
                postalCode: req.body.shippingInformation.postalCode,
                country: req.body.shippingInformation.country
            },
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            orderCreatorInfo: {
                _id: req.user._id,
                email: req.user.email,
            },
        });
        const createdOrder = await order.save();
        res.status(201).send({message: "NeW Order Created", order: createdOrder});
    }catch(error){
        res.status(500).send({message: "Oops! There was an error creating your order. Please, retry"});
    }
}

//update Order
const updateOrder = async (req, res) => {
  
    try{
      const order = await Order.findById(req.params.id);
      const periodToUpdate = () =>{
            const gracePeriod = 1;
            let orderDate =  new Date(order?.isPaidAt);
            const expirationDate = orderDate.setDate(orderDate.getDate() + gracePeriod);
            return expirationDate > Date.now() ? true : false;
      }

      if((order.isPaid && periodToUpdate()) || isAdmin ){
            if(order.orderCreatorInfo.username === req.user?.username || isAdmin){
                try{
                    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
                        $set: req.body,
                    }, {new: true});
        
                    res.status(200).json(updatedOrder);
                }catch(err){
                    res.status(500).json(err)
                }
            }else{
                res.status(401).send("An error occured.");
            }
      }else{
        res.status(401).send("You are not authorized to update this order!");
      }
    }catch(err){
         res.status(500).send({message: "An Error Occured."})
     }
}

  //Delete an Order
  const deleteOrder = async (req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        if(order.orderCreator === req.user?.username || isAdmin){
            await Order.findByIdAndDelete(req.params.id);
            res.send({message: "You have successfully deleted the order."})
        }else{
            res.send({message: "You cannot delete an order you did not create."});

        }
       
    }else{
        res.send({message: "Product does not exist!"});
    }  
  }

   const payOrder =  async ( req, res )=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {id: req.body.id, status: req.body.status, update_time: req.body.update_time, email_address: req.body.email_address}
        const updatedOrder = await order.save();
        res.send({message: "Order Paid", order: updatedOrder})
    }else{
        res.status(404).send({message: "Order Not Found"});
    }
};


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    payOrder
}