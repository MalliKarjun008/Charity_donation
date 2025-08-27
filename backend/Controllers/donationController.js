const Donation = require('../models/Donation');
const Charity = require('../models/Charity');
const User = require('../models/User');
const blockchainService = require('../utils/web3');
const fraudDetectionModel = require('../ml-models/fraudDetection');

// Make a donation
exports.makeDonation = async (req, res) => {
  try {
    const { charityId, amount, donorPrivateKey } = req.body;
    const donorId = req.user.id;
    
    // Get donor and charity details
    const donor = await User.findById(donorId);
    const charity = await Charity.findById(charityId);
    
    if (!donor || !charity) {
      return res.status(404).json({ message: 'Donor or charity not found' });
    }
    
    if (!donor.walletAddress) {
      return res.status(400).json({ message: 'Donor wallet address not set' });
    }
    
    // Convert amount to wei
    const amountInWei = blockchainService.web3.utils.toWei(amount.toString(), 'ether');
    
    // Check fraud potential before processing
    const fraudData = {
      amount: parseFloat(amount),
      donationFrequency: await Donation.countDocuments({ donor: donorId }),
      timeSinceLastDonation: 24, // Example: hours since last donation
      donorHistoryScore: 0.8, // Example: based on donor history
      recipientPatternScore: 0.7 // Example: based on recipient patterns
    };
    
    const fraudPrediction = await fraudDetectionModel.predict(fraudData);
    
    if (fraudPrediction.isFraud) {
      // Create a record of flagged transaction
      const flaggedDonation = await Donation.create({
        donor: donorId,
        charity: charityId,
        amount,
        transactionHash: 'flagged_' + Date.now(),
        status: 'flagged',
        fraudScore: fraudPrediction.fraudScore,
        isFraud: true
      });
      
      return res.status(400).json({
        message: 'Transaction flagged as potentially fraudulent',
        fraudScore: fraudPrediction.fraudScore,
        donationId: flaggedDonation._id
      });
    }
    
    // Process blockchain transaction
    const receipt = await blockchainService.makeDonation(
      charity.walletAddress,
      donor.walletAddress,
      amountInWei,
      donorPrivateKey
    );
    
    // Save donation record
    const donation = await Donation.create({
      donor: donorId,
      charity: charityId,
      amount,
      transactionHash: receipt.transactionHash,
      status: 'completed',
      fraudScore: fraudPrediction.fraudScore,
      isFraud: false,
      blockNumber: receipt.blockNumber
    });
    
    // Update charity donation stats
    await Charity.findByIdAndUpdate(charityId, {
      $inc: { totalDonations: amount, donationCount: 1 }
    });
    
    res.status(201).json({
      success: true,
      donation,
      transactionHash: receipt.transactionHash
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all donations
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donor', 'name email')
      .populate('charity', 'name')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: donations.length,
      donations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get donation by ID
exports.getDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'name email walletAddress')
      .populate('charity', 'name walletAddress');
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    // Get blockchain verification if available
    let blockchainData = null;
    if (donation.transactionHash && !donation.transactionHash.startsWith('flagged')) {
      try {
        const charity = await Charity.findById(donation.charity._id);
        blockchainData = await blockchainService.getDonationDetails(
          charity.walletAddress,
          donation._id.toString()
        );
      } catch (error) {
        console.error('Error fetching blockchain data:', error);
      }
    }
    
    res.status(200).json({
      success: true,
      donation: {
        ...donation.toObject(),
        blockchainData
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get donations by donor
exports.getDonorDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id })
      .populate('charity', 'name')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: donations.length,
      donations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};