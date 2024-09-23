const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
  },
  quantity: {
      type: Number,
      required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  outlet: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Outlet' 
  },
  orderItems: [orderItemSchema],
  orderStatus: {
    type: String,
    enum: ['pending','dispatch', 'On the way', 'delivered'],
    default: 'pending'
    },
  shippingAddress1:{
    type:String,
    require:true,
  }, 
  shippingAddress2:{
    type:String,
    require:true,
    },
  city:{
    type:String,
    require:true,
  },
  state:{
    type:String,
    require:true,
    },
  country:{
    type:String,
    require:true,
    },
  totalPrice:{
    type:Number,
  }, 
  paymentMethod:['online mode', 'cash on delivery'],
  

  deliveryFee: Number,
  date: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('Order', orderSchema);
