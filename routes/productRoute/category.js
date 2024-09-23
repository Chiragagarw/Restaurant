const express = require("express");
const router = express.Router();
const category = require('../../controller/productController/productCategory');
const auth = require('../../middleware/adminAuth');


router.post('/addCategory', auth.admin, category.createCategory);
router.get('/getAll',auth.admin,category.getAllCategory);

module.exports = router;