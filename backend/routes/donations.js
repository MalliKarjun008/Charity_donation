const express = require('express');
const {
  makeDonation,
  getDonations,
  getDonation,
  getDonorDonations
} = require('../controllers/donationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, makeDonation);
router.get('/', protect, getDonations);
router.get('/:id', protect, getDonation);
router.get('/donor/mine', protect, getDonorDonations);

module.exports = router;