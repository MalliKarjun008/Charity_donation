// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Charity {
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
        bool isCompleted;
    }
    
    address public owner;
    string public charityName;
    uint256 public totalDonations;
    uint256 public donationCount;
    
    mapping(uint256 => Donation) public donations;
    mapping(address => uint256[]) public donorDonations;
    
    event DonationReceived(
        uint256 donationId,
        address indexed donor,
        uint256 amount,
        uint256 timestamp
    );
    
    event FundsWithdrawn(
        address indexed charity,
        uint256 amount,
        uint256 timestamp
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor(string memory _name) {
        owner = msg.sender;
        charityName = _name;
    }
    
    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        
        donationCount++;
        donations[donationCount] = Donation(
            msg.sender,
            msg.value,
            block.timestamp,
            true
        );
        
        donorDonations[msg.sender].push(donationCount);
        totalDonations += msg.value;
        
        emit DonationReceived(
            donationCount,
            msg.sender,
            msg.value,
            block.timestamp
        );
    }
    
    function withdrawFunds(address payable _recipient, uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance");
        _recipient.transfer(_amount);
        
        emit FundsWithdrawn(_recipient, _amount, block.timestamp);
    }
    
    function getDonation(uint256 _donationId) external view returns (
        address donor,
        uint256 amount,
        uint256 timestamp,
        bool isCompleted
    ) {
        Donation memory donation = donations[_donationId];
        return (
            donation.donor,
            donation.amount,
            donation.timestamp,
            donation.isCompleted
        );
    }
    
    function getDonorDonations(address _donor) external view returns (uint256[] memory) {
        return donorDonations[_donor];
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}