const EthereumTx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const url = 'https://ropsten.infura.io/v3/90e93a35b33a45ed917e8681aee1f738';
const web3 = new Web3(url);

const account1 = '0x000086998B2Ae5a51862fA496fe07FD525812357';
const account2 = '0xa3Cea76EB5cb584f6Db76294fA7d214eEFA1d2Ac';

const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

web3.eth.getTransactionCount(account1, (err, txCount) => {
    if(err) {
        console.log('error1:', err);
    } else {
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: account2,
            value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
        }

        const tx = new EthereumTx(txObject, { chain: 'ropsten' });
        tx.sign(privateKey);

        const serializedTransaction = tx.serialize();
        const raw = '0x' + serializedTransaction.toString('hex');

        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            txHash ? console.log('txHash:', txHash) : console.log('error2:', err);
        })
    }    
});