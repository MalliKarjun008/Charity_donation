const express = require('express');
const router = express.Router();
const donationController = require('../Controllers/donationController');
const authController = require('../Controllers/authController'); // everything in one file

router.post('/', authController.protect, donationController.makeDonation); // private donation
router.get('/', authController.protect, authController.restrictTo('admin'), donationController.getAllDonations); // admin only
router.get('/:id', authController.protect, donationController.getDonation); // donor or admin

module.exports = router;
