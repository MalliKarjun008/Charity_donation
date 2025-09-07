const express = require('express');
const {
  getStats,
  getUsers,
  updateUserRole,
  getFlaggedDonations
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');
a
const router = express.Router();

router.get('/stats', protect, authorize('admin'), getStats);
router.get('/users', protect, authorize('admin'), getUsers);
router.put('/users/:id/role', protect, authorize('admin'), updateUserRole);
router.get('/donations/flagged', protect, authorize('admin', 'trustee'), getFlaggedDonations);

module.exports = router;