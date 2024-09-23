const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const vendorSchema = new mongoose.Schema({
  vendorName:{
    type:String,
    required:true
  },
  nameOfRestaurant: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
    },
  location:{
    type: {
    type: String,
    enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
      },
    },
  rating: {
    type: Number,
  },
  productId: {
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: false 
   },
  reviews: {
    type: Array,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
  profileStatus: { 
    type: Number, 
    default: 0 
  },
  menuItems: [{ 
    type: String,
   }],
   status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  },
});



vendorSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('Vendor', vendorSchema);













// location: {
//   type: Array,
//   coordinates: { type: [Number], default: [0, 0] }
// },