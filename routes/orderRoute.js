const express = require('express');
const router = express.Router();
const order = require('../controller/orderController');
const auth = require('../middleware/auth');

router.post('/createorder',auth, order.createOrder);
router.put('/dispatch',order.dispatchOrder);
router.get('/getAllPendingOrder', order.getAllPendingOrder);
router.get('/getAllDeliveredOrder', order.getAllDeliveredOrder);


module.exports = router;