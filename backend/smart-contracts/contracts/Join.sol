// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Join {
    struct User {
        address walletAddress;
        string name;
        string email;
        string role; // "donor", "trustee", "admin", "beneficiary"
        bool isVerified;
        uint256 joinDate;
    }
    
    address public owner;
    mapping(address => User) public users;
    address[] public userAddresses;
    
    event UserRegistered(
        address indexed walletAddress,
        string name,
        string email,
        string role,
        uint256 joinDate
    );
    
    event UserVerified(address indexed walletAddress, bool isVerified);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function registerUser(
        string memory _name,
        string memory _email,
        string memory _role
    ) external {
        require(users[msg.sender].joinDate == 0, "User already registered");
        
        users[msg.sender] = User({
            walletAddress: msg.sender,
            name: _name,
            email: _email,
            role: _role,
            isVerified: false,
            joinDate: block.timestamp
        });
        
        userAddresses.push(msg.sender);
        
        emit UserRegistered(
            msg.sender,
            _name,
            _email,
            _role,
            block.timestamp
        );
    }
    
    function verifyUser(address _userAddress, bool _isVerified) external onlyOwner {
        require(users[_userAddress].joinDate != 0, "User not registered");
        users[_userAddress].isVerified = _isVerified;
        
        emit UserVerified(_userAddress, _isVerified);
    }
    
    function getUser(address _userAddress) external view returns (
        address walletAddress,
        string memory name,
        string memory email,
        string memory role,
        bool isVerified,
        uint256 joinDate
    ) {
        User memory user = users[_userAddress];
        return (
            user.walletAddress,
            user.name,
            user.email,
            user.role,
            user.isVerified,
            user.joinDate
        );
    }
    
    function getAllUsers() external view returns (address[] memory) {
        return userAddresses;
    }
    
    function isUserVerified(address _userAddress) external view returns (bool) {
        return users[_userAddress].isVerified;
    }
}