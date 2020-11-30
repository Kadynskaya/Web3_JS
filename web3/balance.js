const Web3 = require('web3');
const url = 'https://ropsten.infura.io/v3/90e93a35b33a45ed917e8681aee1f738';
const web3 = new Web3(url);
const address = '0x000086998B2Ae5a51862fA496fe07FD525812357';

web3.eth.getBalance(address, (err, balance) => {
    balance ? console.log(web3.utils.fromWei(balance, 'ether')) : console.log('error:', err);
});