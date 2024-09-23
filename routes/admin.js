const express = require("express");
const {acceptVendor, vendorRegistration, adminRegister, loginAdmin, updateVendorStatus} = require("../controller/adminController");
const router = express.Router();
const validate = require('../middleware/validate');
const {adminRegisterSchema, adminloginSchema, vendorRegistrationSchema} = require('../models/validation');
const auth = require('../middleware/adminAuth');


router.post("/registrationAdmin",validate(adminRegisterSchema), adminRegister);
router.post("/loginAdmin", validate(adminloginSchema), loginAdmin);
router.post("/admin",auth.admin,validate(vendorRegistrationSchema), vendorRegistration);
router.put('/status',auth.admin, acceptVendor);
router.put('/vendorStatus',auth.admin, updateVendorStatus)

module.exports = router;