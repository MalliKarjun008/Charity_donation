const User = require('../models/User');
const Charity = require('../models/Charity');
const Donation = require('../models/Donation');

// Get system statistics
exports.getStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Only admins can access statistics' 
      });
    }
    
    const usersCount = await User.countDocuments();
    const charitiesCount = await Charity.countDocuments();
    const donationsCount = await Donation.countDocuments();
    
    const totalDonations = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);
    
    const flaggedDonations = await Donation.countDocuments({ isFraud: true });
    
    res.status(200).json({
      success: true,
      stats: {
        users: usersCount,
        charities: charitiesCount,
        donations: donationsCount,
        totalAmount: totalDonations[0]?.totalAmount || 0,
        flaggedDonations
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Only admins can access user data' 
      });
    }
    
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Only admins can update user roles' 
      });
    }
    
    const { role } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get flagged donations
exports.getFlaggedDonations = async (req, res) => {
  try {
    // Check if user is admin or trustee
    if (!['admin', 'trustee'].includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Only admins or trustees can access flagged donations' 
      });
    }
    
    const donations = await Donation.find({ isFraud: true })
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