const express =require('express');
const router = express.Router();
const vendorController = require('../controller/vendorController');
const auth = require('../middleware/adminAuth');

//router.post("/admin",auth.admin,auth.subAdmin, vendorController.adminController);
router.post('/vendorLogin', vendorController.loginVendor);
router.put('/update', auth.admin, vendorController.updateProfile);
router.get('/vendors', vendorController.getVendors);
router.get('/pendingVendor', vendorController.getPendingVendors)
router.get('/nearby', vendorController.findNearbyVendors);
router.post('/addMenuItems',auth.admin,vendorController.addMenuItems);
router.get('/findProduct',vendorController.checkProductAvailability);
router.post('/review', vendorController.reviewsForVendor);
router.get('/getReviews', vendorController.getReviewsForVendor);

module.exports = router;