// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet {
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
        string description;
        bool isCompleted;
    }
    
    address public owner;
    mapping(address => uint256) public balances;
    Transaction[] public transactions;
    
    event Deposit(
        address indexed from,
        uint256 amount,
        uint256 timestamp
    );
    
    event Withdrawal(
        address indexed to,
        uint256 amount,
        uint256 timestamp
    );
    
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 timestamp,
        string description
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        
        balances[msg.sender] += msg.value;
        
        transactions.push(Transaction({
            from: msg.sender,
            to: address(this),
            amount: msg.value,
            timestamp: block.timestamp,
            description: "Deposit",
            isCompleted: true
        }));
        
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }
    
    function withdraw(uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        
        transactions.push(Transaction({
            from: address(this),
            to: msg.sender,
            amount: _amount,
            timestamp: block.timestamp,
            description: "Withdrawal",
            isCompleted: true
        }));
        
        emit Withdrawal(msg.sender, _amount, block.timestamp);
    }
    
    function transfer(address _to, uint256 _amount, string memory _description) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        require(_to != address(0), "Invalid recipient address");
        
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        
        transactions.push(Transaction({
            from: msg.sender,
            to: _to,
            amount: _amount,
            timestamp: block.timestamp,
            description: _description,
            isCompleted: true
        }));
        
        emit Transfer(msg.sender, _to, _amount, block.timestamp, _description);
    }
    
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
    
    function getTotalBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }
    
    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }
    
    function getTransaction(uint256 _index) external view returns (
        address from,
        address to,
        uint256 amount,
        uint256 timestamp,
        string memory description,
        bool isCompleted
    ) {
        require(_index < transactions.length, "Transaction index out of bounds");
        
        Transaction memory transaction = transactions[_index];
        return (
            transaction.from,
            transaction.to,
            transaction.amount,
            transaction.timestamp,
            transaction.description,
            transaction.isCompleted
        );
    }
}