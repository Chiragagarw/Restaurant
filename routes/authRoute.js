const express = require("express");
const { registerController, loginController} = require("../controller/authController");
const validation = require('../middleware/validate');
const {userRegistrationSchema, userloginSchema} = require('../models/validation')
const router = express.Router();
const auth = require('../middleware/auth');


router.post("/register",validation(userRegistrationSchema),registerController);
router.post("/login",validation(userloginSchema), loginController);

module.exports = router;