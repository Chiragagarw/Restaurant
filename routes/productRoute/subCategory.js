const express= require('express');
const router = express.Router();
const subCategory= require('../../controller/productController/productSubCategory');
const auth = require('../../middleware/adminAuth');


router.post('/add',auth.admin,subCategory.createSubcategory);
router.get('/subCategory',auth.admin ,subCategory.getAllSubcategory);

module.exports= router;