const express = require('express');
const router = express.Router();
const campaignController = require('../Controllers/campaignController'); // check folder name
const authController = require('../Controllers/authController'); // exact match, no middleware folder

// Public routes
router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaign);

// Admin-only routes
router.post('/', authController.protect, authController.restrictTo('admin'), campaignController.createCampaign);
router.patch('/:id', authController.protect, authController.restrictTo('admin'), campaignController.updateCampaign);
router.delete('/:id', authController.protect, authController.restrictTo('admin'), campaignController.deleteCampaign);

module.exports = router;
