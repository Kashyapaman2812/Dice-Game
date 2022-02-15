const HDWalletProvider = require('truffle-hdwallet-provider');
//it is the provider acting between our Infura ABI and web3 object
const Web3 = require('web3');
//Web3 is a constructor function
const Register = require('../Contract-Ethereum/build/Dice_Game.json');
//Register is taking in the byte code returned after compiling
const provider = new HDWalletProvider(
  'lumber ill danger ride rare brisk trick clarify front rely vacant fan',
  'https://rinkeby.infura.io/v3/39729526ed3846adbe840d6d87dd13c3'
);
//HDWalletProvider takes the 12 words Mnemonic to aaccess our metamask account via infura ABI
const web3 = new Web3(provider);

const deploy = async () => {
  console.log(Register.bytecode);
  const accounts = await web3.eth.getAccounts();
  console.log('Address of account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(Register.interface))
    .deploy({ data: Register.bytecode })
    .send({ gas: '6700000', gasPrice: '10000000000', from: accounts[0] });

  console.log('Contract deployed at', result.options.address);
};

deploy();