const mongoose = require('mongoose');

const deliveryManSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  email:{
    type: String,
    require: true,
  },
  password:{
    type: String,
    required: true
  },
  
  deliveries: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order' 
  }]
});

module.exports = mongoose.model('DeliveryMan', deliveryManSchema);
