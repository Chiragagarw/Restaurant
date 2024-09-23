const Category = require('../../models/productCategory');



exports.createCategory = async (req, res)=>{
    console.log("gdsjgjf")
    const { name } = req.body;
    console.log(req.body);

    const category = new Category({name});
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    }catch(err){
        res.status(400).json({message: "error",err});
    }
};

exports.getAllCategory = async (req,res)=>{
    try{
        const categories = await Category.find();
        res.json({status:201, message:'success', categories});
    }catch(err){
        res.status(500).json({message: err.message});
    }
};