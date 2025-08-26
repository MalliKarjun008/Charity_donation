const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Make a donation (Private)
exports.makeDonation = catchAsync(async (req, res, next) => {
  const { campaignId, amount, paymentId } = req.body;

  const donation = await Donation.create({
    donorId: req.user._id,
    campaignId,
    amount,
    status: 'completed',
    paymentId,
  });

  // Update campaign collectedAmount
  await Campaign.findByIdAndUpdate(campaignId, { $inc: { collectedAmount: amount } });

  res.status(201).json({ status: 'success', data: donation });
});

// Admin: view all donations
exports.getAllDonations = catchAsync(async (req, res, next) => {
  const donations = await Donation.find().populate('donorId').populate('campaignId');
  res.status(200).json({ status: 'success', results: donations.length, data: donations });
});

// Get single donation details (Private: donor or Admin)
exports.getDonation = catchAsync(async (req, res, next) => {
  const donation = await Donation.findById(req.params.id).populate('donorId').populate('campaignId');
  if (!donation) return next(new AppError('Donation not found', 404));

  if (req.user.role !== 'admin' && donation.donorId._id.toString() !== req.user._id.toString()) {
    return next(new AppError('Forbidden', 403));
  }

  res.status(200).json({ status: 'success', data: donation });
});
