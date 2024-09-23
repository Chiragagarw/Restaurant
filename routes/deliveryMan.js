const express = require('express');
const router = express.Router();
const Delivery = require('../controller/deliveryManController');
const {deliveryManRegistrationSchema} = require('../models/validation');
const validation = require('../middleware/validate');
const auth = require('../middleware/deliveryManauth');


router.post('/createDeliveryMen',validation(deliveryManRegistrationSchema), Delivery.createDeliveryMen);
router.post('/orderAssignToDeliveryMan',Delivery.orderDeliver);
router.put('/statusofproduct',auth,Delivery.orderDeliveryStatus);



module.exports = router;