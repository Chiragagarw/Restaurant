const Order = require('../models/order');
const User = require('../models/user');
const Outlet = require('../models/vendor');
const Product = require('../models/product');
const Vendor = require('../models/vendor');

exports.createOrder = async(req, res) => {
    try {
        const { user, outlet, orderItems, shippingAddress1, shippingAddress2, city, state, country, totalAmount,paymentMethod, deliveryFee } = req.body;
        const foundUser = await User.findById(user);
        const foundOutlet = await Outlet.findById(outlet);
        if (!foundUser || !foundOutlet) {
            return res.status(404).json({ message: "User or Outlet not found" });
            }
            const order = new Order({
                user,
                outlet,
                orderItems,
                shippingAddress1,
                shippingAddress2,
                city,
                state,
                country,
                totalAmount,
                paymentMethod,
                deliveryFee,
            });
            
        const savedOrder = await order.save();
        res.status(201).json({status:201, message: "success", savedOrder})    

    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.dispatchOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(orderId,{ orderStatus: 'dispatch' },{ new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ status: 200, message: "Order dispatched", updatedOrder });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllPendingOrder = async (req, res) =>{
    try{
        const orders = await Order.find({orderStatus: 'pending'});
        res.status(200).json({status:200, message: "success", orders})

    }catch(err){
        console.log(err);
        res.status(500).json({message: "server error", err});
    }
};

exports.getAllDeliveredOrder = async (req, res) =>{
    try{
        const orders = await Order.find({orderStatus: 'delivered'});
        res.status(200).json({status:200, message: "success", orders})

    }catch(err){
        console.log(err);
        res.status(500).json({message: "server error", err});
    }
};


exports.getAllPendingOrder = async (req, res) =>{
    try{
        const orders = await Order.find({orderStatus: 'pending'});
        res.status(200).json({status:200, message: "success pending order", orders})

    }catch(err){
        console.log(err);
        res.status(500).json({message: "server error", err});
    }
};

