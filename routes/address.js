const express = require('express');
const router = express.Router();
const address = require('../controller/addressController');

router.post('/create', address.createAddress);
router.get('/:id', address.getAddressesForUser);
router.put('/updateAddress', address.updateAddress);
router.delete('/deleteAddress', address.deleteAddress);

module.exports = router;