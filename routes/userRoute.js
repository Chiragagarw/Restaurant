const express = require('express');
const router = express.Router();
const {getUserController,
    getAllUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteProfileController,
    checkAndNotifyBirthdays, } = require('../controller/userController');

const authMiddleware = require('../middleware/auth');
const auth = require('../middleware/adminAuth')

router.get('/getUser', auth.admin, getUserController);
router.get('/getAllUser', auth.admin, getAllUserController);
router.put("/updateUser", authMiddleware, updateUserController);
router.post("/updatePassword", authMiddleware, updatePasswordController);
router.post("/resetPassword", authMiddleware, resetPasswordController);
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);
router.get("/Birthday", authMiddleware, checkAndNotifyBirthdays);


module.exports = router;
