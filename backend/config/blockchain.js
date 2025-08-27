// Mock implementation without web3 dependency
console.log('Using mock blockchain implementation');

// Mock web3 object with required functionality
const web3 = {
  eth: {
    getAccounts: async () => ['0x1234567890123456789012345678901234567890'],
    getBalance: async () => '1000000000000000000', // 1 ETH in wei
    sendTransaction: async () => ({ transactionHash: '0x' + Math.random().toString(16).substr(2, 64) })
  },
  utils: {
    fromWei: (wei, unit) => parseFloat(wei) / 1e18,
    toWei: (eth, unit) => (parseFloat(eth) * 1e18).toString()
  }
};

// Get accounts
const getAccounts = async () => {
  return await web3.eth.getAccounts();
};

// Get balance
const getBalance = async (address) => {
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, 'ether');
};

module.exports = {
  web3,
  getAccounts,
  getBalance
};