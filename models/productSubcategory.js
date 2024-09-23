const mongoose = require('mongoose');
const { Schema } = mongoose;

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    description: {
        type: String
        },

});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);
module.exports = Subcategory;