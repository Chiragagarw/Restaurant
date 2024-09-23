const express = require('express');
const router = express.Router();
const {createProduct, getProduct, updateProduct, deleteProduct} = require('../../controller/productController/product');
const auth = require('../../middleware/adminAuth');

router.post('/addProduct',auth.admin,createProduct),
router.get('/getProduct',auth.admin,getProduct);
router.put('/updateProduct',auth.admin, updateProduct);
router.delete('/deleteProduct', auth.admin, deleteProduct)

module.exports = router