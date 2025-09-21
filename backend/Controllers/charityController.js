const Charity = require("../../backend_with_blockchain/models/Charity");
const User = require("../../backend_with_blockchain/models/User");
const Donation = require("../../backend_with_blockchain/models/Donation");
const blockchainService = require("../../backend/utils/web3");

// Create a new charity
exports.createCharity = async (req, res) => {
  try {
    const { name, description, walletAddress } = req.body;

    // Check if user is admin or trustee
    if (!["admin", "trustee"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Only admins or trustees can create charities",
      });
    }

    // Check if charity already exists
    const charityExists = await Charity.findOne({
      $or: [{ name }, { walletAddress }],
    });

    if (charityExists) {
      return res.status(400).json({
        message: "Charity with this name or wallet address already exists",
      });
    }

    // Create charity
    const charity = await Charity.create({
      name,
      description,
      walletAddress,
      admin: req.user.id,
    });

    res.status(201).json({
      success: true,
      charity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all charities
exports.getCharities = async (req, res) => {
  try {
    const charities = await Charity.find()
      .populate("admin", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: charities.length,
      charities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single charity
exports.getCharity = async (req, res) => {
  try {
    const charity = await Charity.findById(req.params.id).populate(
      "admin",
      "name email"
    );

    if (!charity) {
      return res.status(404).json({ message: "Charity not found" });
    }

    // Get blockchain balance
    let blockchainBalance = 0;
    try {
      blockchainBalance = await blockchainService.getCharityBalance(
        charity.walletAddress
      );
    } catch (error) {
      console.error("Error fetching blockchain balance:", error);
    }

    // Get donation stats
    const donationStats = await Donation.aggregate([
      { $match: { charity: charity._id } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          donationCount: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      charity: {
        ...charity.toObject(),
        blockchainBalance,
        totalAmount: donationStats[0]?.totalAmount || 0,
        donationCount: donationStats[0]?.donationCount || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update charity
exports.updateCharity = async (req, res) => {
  try {
    const { name, description, verified } = req.body;

    let charity = await Charity.findById(req.params.id);

    if (!charity) {
      return res.status(404).json({ message: "Charity not found" });
    }

    // Check if user is admin or charity admin
    if (req.user.role !== "admin" && charity.admin.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this charity",
      });
    }

    charity = await Charity.findByIdAndUpdate(
      req.params.id,
      { name, description, verified },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      charity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete charity
exports.deleteCharity = async (req, res) => {
  try {
    const charity = await Charity.findById(req.params.id);

    if (!charity) {
      return res.status(404).json({ message: "Charity not found" });
    }

    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admins can delete charities",
      });
    }

    await Charity.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Charity deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get charity donations
exports.getCharityDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ charity: req.params.id })
      .populate("donor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
