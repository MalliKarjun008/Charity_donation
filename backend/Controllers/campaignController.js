const Campaign = require('../models/Campaign');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all campaigns (Public)
exports.getAllCampaigns = catchAsync(async (req, res, next) => {
  const campaigns = await Campaign.find();
  res.status(200).json({ status: 'success', results: campaigns.length, data: campaigns });
});

// Get single campaign (Public)
exports.getCampaign = catchAsync(async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) return next(new AppError('Campaign not found', 404));
  res.status(200).json({ status: 'success', data: campaign });
});

// Create campaign (Admin)
exports.createCampaign = catchAsync(async (req, res, next) => {
  const campaign = await Campaign.create(req.body);
  res.status(201).json({ status: 'success', data: campaign });
});

// Update campaign (Admin)
exports.updateCampaign = catchAsync(async (req, res, next) => {
  const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!campaign) return next(new AppError('Campaign not found', 404));
  res.status(200).json({ status: 'success', data: campaign });
});

// Delete campaign (Admin)
exports.deleteCampaign = catchAsync(async (req, res, next) => {
  const campaign = await Campaign.findByIdAndDelete(req.params.id);
  if (!campaign) return next(new AppError('Campaign not found', 404));
  res.status(204).json({ status: 'success', data: null });
});
