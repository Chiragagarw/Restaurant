const DeliveryMan = require('../models/deliveryMan');
const Order = require('../models/order');
const jwt = require('jsonwebtoken');

exports.createDeliveryMen = async(req,res)=>{
    
    try{
        const {name, phone, email, password,  }= req.body;
        if(!name || !phone || !email || !password){
            return res.status(400).json({message: 'Please fill all fields'});
        }
        const existingDeliveryMan = await DeliveryMan.findOne({email});
        if(existingDeliveryMan){
            return res.status(400).json({message: 'Email already exists'});
            };

        const deliveryMan = await DeliveryMan.create(req.body);
        const token = jwt.sign({  email: deliveryMan.email }, process.env.JWT_SECRET_DeliveryMan,{ expiresIn: '1d' } 
        );
        res.status(201).json({message:"Delivery Man created successfully",deliveryMan, token});
        }catch(err){
            res.status(500).json({message:"Error creating delivery man",err});
        }
};
exports.orderDeliver = async(req, res)=>{
    try{
        const {id, deliveryManId} = req.body;
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({message: 'Order not found'});
        }
        const deliveryMan = await DeliveryMan.findById(deliveryManId);
        if(!deliveryMan){
            return res.status(404).json({message: 'Delivery man not found'});
            }
        order.deliveryMan = deliveryMan._id;
        await order.save();
        res.status(200).json({message: 'Order assigned to delivery man successfully', order});

    }catch(err){
        res.status(500).json({message:"Error delivering order",err});
    }

};

//ek ismai abhi ek api yee bhi bnani hai jismai ye hoga ki user se cash lena hai yaa nhi
// ek delivery man hee status ko update krega yee chahiye yee toh done see baba....
// ek ek delivery boy ek se jada order deliver ker skta hai toh orders add ki api bnegi ek 


exports.orderDeliveryStatus = async (req,res)=> {
    const {id , status} = req.body;
    if(!['On the way','delivered'].includes(status)){
      return res.status(400).send({success: false,message: "Invalid Status"});
    }
    try{
      const order = await Order.findById(id);
      if(!order){
        return res.status(404).send({success: false,message: "Order Not Found"});
    }
    console.log("befor order", order)
    order.orderStatus = status;
    console.log("after",order)
    const orderStatus = await order.save();
    console.log("successfully updated",orderStatus)
    res.status(200).send({success: true,message: "Order status updated Successfully", data:orderStatus})
  }catch(err){
    console.log(err);
    res.status(400).send({success: "false", message:"error", err});
  }
  };