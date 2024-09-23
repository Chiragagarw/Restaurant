const Subcategory = require('../../models/productSubcategory');
const Category = require('../../models/productCategory');

exports.createSubcategory = async (req,res)=>{
    try{
        const category = await Category.findById(req.body.categoryId);
        if(!category) return res.status(404).json({message: "Category not found"});
        const subcategory = new Subcategory({
            name: req.body.name,
            categoryId: req.body.categoryId,
         //   description: req.body.description,

        });
        const newSubcategory = await subcategory.save();
        res.status(201).json({message: "Subcategory created successfully", newSubcategory});
    } catch(err){
        res.status(400).json({message: "Error creating subcategory", error: err});
    }
};

exports.getAllSubcategory = async (req,res)=>{
    console.log("hello")
    try{
        const subCategories = await Subcategory.find();
        res.json({status:201, message:'success', subCategories});
    }catch(err){
        res.status(400).json({message: err.message});
    }
};
