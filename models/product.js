const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    title: {
         type: String, 
         required: true 
        },

    description: {
         type: String 
        },

    price: {
         type: Number,
          required: true 
        },

    discount: {
        type: Number
        },

    rating: {
        type: Number,
        default: 0
        },

    categoryId: {
         type: Schema.Types.ObjectId, 
         ref: 'Category', 
         required: true 
        },
    subcategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Subcategory', 
      required: true 
    },
    imageUrl: { 
        type: String 
    },
    productStatus: {
      type: Number, 
      required: true 
    },
 
});

module.exports = mongoose.model('Product', productSchema);
