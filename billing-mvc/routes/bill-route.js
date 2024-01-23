const express = require('express');

const billController = require('../controllers/bill-controller');

const router = express.Router();

router.post('/', billController.createBill);
router.get('/', billController.getBill);
router.delete('/:billId', billController.deleteBill);
router.patch('/:billId', billController.updateBill);

module.exports = router;
