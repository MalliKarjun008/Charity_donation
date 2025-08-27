const express = require('express');
const {
  createCharity,
  getCharities,
  getCharity,
  updateCharity,
  deleteCharity,
  getCharityDonations
} = require('../controllers/charityController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('admin', 'trustee'), createCharity);
router.get('/', getCharities);
router.get('/:id', getCharity);
router.put('/:id', protect, updateCharity);
router.delete('/:id', protect, authorize('admin'), deleteCharity);
router.get('/:id/donations', getCharityDonations);

module.exports = router;