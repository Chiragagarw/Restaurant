const Product = require('../../models/product');
const Category = require('../../models/productCategory');
const Subcategory = require('../../models/productSubcategory');

exports.createProduct = async (req, res) => {
    try {
        const category = await Category.findById(req.body.categoryId);
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }
        const subcategory = await Subcategory.findById(req.body.subcategoryId);
        if(!subcategory){
            return res.status(404).json({message:'subcategory not found'});
        }

        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
            rating: req.body.rating,
            imageUrl: req.body.image,
            productStatus: req.body.productStatus,
            
        });
        const newProduct= await product.save();
        res.status(201).json({message: "Product created successfully", data: newProduct});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.query.id;
        const updateData = req.body;
        console.log(productId)

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData);

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", data:updateData, updatedProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.query.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully",deletedProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};