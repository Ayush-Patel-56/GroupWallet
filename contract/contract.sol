// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GroupWallet {
    address public owner;                      // Deployer of the contract
    mapping(address => bool) public isMember;  // Who is allowed to withdraw

    event Deposit(address indexed from, uint256 amount);
    event Withdraw(address indexed to, uint256 amount);
    event MemberAdded(address indexed member);
    event MemberRemoved(address indexed member);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyMember() {
        require(isMember[msg.sender], "Not a member");
        _;
    }

    constructor() {
        owner = msg.sender;          // No input during deployment
        isMember[msg.sender] = true; // Deployer is also a member by default
        emit MemberAdded(msg.sender);
    }

    // Receive ether sent directly to the contract
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Fallback for unknown function calls sending ETH
    fallback() external payable {
        if (msg.value > 0) {
            emit Deposit(msg.sender, msg.value);
        }
    }

    // Anyone can deposit using this function too (optional helper)
    function deposit() external payable {
        require(msg.value > 0, "No ETH sent");
        emit Deposit(msg.sender, msg.value);
    }

    // Owner adds a new member
    function addMember(address _member) external onlyOwner {
        require(!isMember[_member], "Already member");
        isMember[_member] = true;
        emit MemberAdded(_member);
    }

    // Owner removes a member
    function removeMember(address _member) external onlyOwner {
        require(isMember[_member], "Not a member");
        isMember[_member] = false;
        emit MemberRemoved(_member);
    }

    // Member withdraws some ETH to their own address
    function withdraw(uint256 _amount) external onlyMember {
        require(address(this).balance >= _amount, "Not enough balance");
        payable(msg.sender).transfer(_amount);
        emit Withdraw(msg.sender, _amount);
    }

    // Check total ETH stored in the group wallet
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}